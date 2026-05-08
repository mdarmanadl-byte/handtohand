import type { ApiEnvelope, RequestItem } from "@/types";
import { api } from "./api";

export async function fetchRequests() {
  const response = await api.get<ApiEnvelope<RequestItem[]>>("/requests");
  return response.data.data;
}

export async function fetchRequest(requestId: string) {
  const response = await api.get<ApiEnvelope<RequestItem>>(`/requests/${requestId}`);
  return response.data.data;
}

export async function createRequest(payload: {
  title: string;
  description: string;
  itemName: string;
  type: "CONSUMABLE" | "BORROWABLE";
  placeId: string;
  rewardCoins: number;
  depositCoins: number;
  isUrgent: boolean;
  expiresInMinutes: number;
}) {
  const response = await api.post<ApiEnvelope<RequestItem>>("/requests", payload);
  return response.data.data;
}

export async function acceptRequest(requestId: string) {
  const response = await api.post<ApiEnvelope<RequestItem>>(`/requests/${requestId}/accept`);
  return response.data.data;
}

export async function updateRequestStatus(requestId: string, status: RequestItem["status"]) {
  const response = await api.patch<ApiEnvelope<RequestItem>>(`/requests/${requestId}/status`, {
    status,
  });
  return response.data.data;
}
