import { db, makeId } from "../../prisma";
import { AppError } from "../../utils/app-error";
import { holdEscrow, refundEscrow } from "../coins/coins.service";
import { createNotification } from "../notifications/notifications.service";

export function listItems() {
  return db.items;
}

export async function createItem(
  ownerId: string,
  payload: {
    title: string;
    description: string;
    category: string;
    securityDepositCoins: number;
    dailyRateCoins: number;
  },
) {
  const timestamp = new Date().toISOString();
  const item = {
    id: makeId("item"),
    ownerId,
    title: payload.title,
    description: payload.description,
    category: payload.category,
    securityDepositCoins: payload.securityDepositCoins,
    dailyRateCoins: payload.dailyRateCoins,
    status: "AVAILABLE" as const,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  db.items.unshift(item);
  return item;
}

export async function createBorrowRequest(itemId: string, borrowerId: string, returnInDays: number) {
  const item = db.items.find((entry) => entry.id === itemId);

  if (!item) {
    throw new AppError(404, "Item not found.");
  }

  if (item.status !== "AVAILABLE") {
    throw new AppError(409, "Item is not available.");
  }

  holdEscrow(
    borrowerId,
    item.securityDepositCoins,
    item.id,
    `Deposit held for borrowing ${item.title}`,
  );

  item.status = "RESERVED";
  item.updatedAt = new Date().toISOString();

  const transaction = {
    id: makeId("borrow"),
    itemId,
    borrowerId,
    ownerId: item.ownerId,
    status: "REQUESTED" as const,
    depositCoins: item.securityDepositCoins,
    returnDueAt: new Date(Date.now() + returnInDays * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.borrowTransactions.unshift(transaction);

  await createNotification({
    userId: item.ownerId,
    title: "Borrow request received",
    body: `${item.title} now has a pending borrower request.`,
    type: "BORROWABLE",
    priority: "MEDIUM",
  });

  return transaction;
}

export async function acceptBorrowRequest(transactionId: string, ownerId: string) {
  const transaction = db.borrowTransactions.find((entry) => entry.id === transactionId);

  if (!transaction || transaction.ownerId !== ownerId) {
    throw new AppError(404, "Borrow transaction not found.");
  }

  const item = db.items.find((entry) => entry.id === transaction.itemId);

  if (!item) {
    throw new AppError(404, "Item not found.");
  }

  transaction.status = "BORROWED";
  transaction.updatedAt = new Date().toISOString();
  item.status = "BORROWED";
  item.updatedAt = new Date().toISOString();

  return transaction;
}

export async function returnBorrowedItem(transactionId: string) {
  const transaction = db.borrowTransactions.find((entry) => entry.id === transactionId);

  if (!transaction) {
    throw new AppError(404, "Borrow transaction not found.");
  }

  const item = db.items.find((entry) => entry.id === transaction.itemId);

  if (!item) {
    throw new AppError(404, "Item not found.");
  }

  transaction.status = "COMPLETED";
  transaction.updatedAt = new Date().toISOString();
  item.status = "AVAILABLE";
  item.updatedAt = new Date().toISOString();

  refundEscrow(
    transaction.borrowerId,
    transaction.depositCoins,
    transaction.id,
    "Borrow deposit refunded after return",
  );

  return transaction;
}
