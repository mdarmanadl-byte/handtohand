import { db, makeId } from "../../prisma";
import { enqueueRequestExpiry } from "../../queues/requestExpiry.queue";
import { emitRequestUpdated } from "../../sockets/request.socket";
import { AppError } from "../../utils/app-error";
import { holdEscrow, refundEscrow, releaseEscrow } from "../coins/coins.service";
import { createNotification } from "../notifications/notifications.service";

const requestFlow = [
  "OPEN",
  "MATCHED",
  "ACCEPTED",
  "PICKED_UP",
  "IN_TRANSIT",
  "DELIVERED",
  "COMPLETED",
] as const;

function getRequestOrThrow(requestId: string) {
  const request = db.requests.find((entry) => entry.id === requestId);

  if (!request) {
    throw new AppError(404, "Request not found.");
  }

  return request;
}

export function listRequests() {
  return db.requests;
}

export function findRequest(requestId: string) {
  return getRequestOrThrow(requestId);
}

export async function createRequest(
  requesterId: string,
  payload: {
    title: string;
    description: string;
    itemName: string;
    type: "CONSUMABLE" | "BORROWABLE";
    placeId: string;
    rewardCoins: number;
    depositCoins: number;
    isUrgent: boolean;
    expiresInMinutes: number;
  },
) {
  const place = db.places.find((entry) => entry.id === payload.placeId);

  if (!place) {
    throw new AppError(404, "Place not found.");
  }

  holdEscrow(
    requesterId,
    payload.rewardCoins + payload.depositCoins,
    "request:create",
    `Escrow held for ${payload.title}`,
  );

  const timestamp = new Date().toISOString();
  const request = {
    id: makeId("request"),
    requesterId,
    helperId: null,
    tripId: null,
    title: payload.title,
    description: payload.description,
    itemName: payload.itemName,
    type: payload.type,
    placeId: payload.placeId,
    status: "OPEN" as const,
    rewardCoins: payload.rewardCoins,
    depositCoins: payload.depositCoins,
    isUrgent: payload.isUrgent,
    expiresAt: new Date(
      Date.now() + payload.expiresInMinutes * 60 * 1000,
    ).toISOString(),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  db.requests.unshift(request);
  await enqueueRequestExpiry({ requestId: request.id, expiresAt: request.expiresAt });
  emitRequestUpdated(request);

  return request;
}

export async function acceptRequest(requestId: string, helperId: string) {
  const request = getRequestOrThrow(requestId);

  if (request.helperId) {
    throw new AppError(409, "Request already accepted.");
  }

  request.helperId = helperId;
  request.status = "ACCEPTED";
  request.updatedAt = new Date().toISOString();

  await createNotification({
    userId: request.requesterId,
    title: "Request accepted",
    body: `${request.itemName} is being picked up by a helper.`,
    type: "REQUEST_MATCH",
    priority: request.isUrgent ? "URGENT" : "HIGH",
  });

  emitRequestUpdated(request);
  return request;
}

export async function updateRequestStatus(requestId: string, status: string) {
  const request = getRequestOrThrow(requestId);

  if (status === "CANCELLED") {
    request.status = "CANCELLED";
    request.updatedAt = new Date().toISOString();
    refundEscrow(
      request.requesterId,
      request.rewardCoins + request.depositCoins,
      request.id,
      "Cancelled request refund",
    );
    emitRequestUpdated(request);
    return request;
  }

  const currentIndex = requestFlow.indexOf(request.status as (typeof requestFlow)[number]);
  const nextIndex = requestFlow.indexOf(status as (typeof requestFlow)[number]);

  if (nextIndex !== currentIndex + 1) {
    throw new AppError(400, `Invalid request status transition to ${status}.`);
  }

  request.status = status as (typeof request)["status"];
  request.updatedAt = new Date().toISOString();

  if (status === "COMPLETED" && request.helperId) {
    releaseEscrow(
      request.helperId,
      request.rewardCoins,
      request.id,
      "Request reward released to helper",
    );
  }

  emitRequestUpdated(request);
  return request;
}
