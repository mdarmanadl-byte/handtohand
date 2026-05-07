import { db, makeId } from "../../prisma";
import { AppError } from "../../utils/app-error";
import { enqueueCoinUpdate } from "../../queues/coin.queue";

function recordTransaction(input: {
  userId: string;
  amount: number;
  direction: "CREDIT" | "DEBIT";
  type: "EARN" | "SPEND" | "ESCROW_HOLD" | "ESCROW_RELEASE" | "REFUND" | "DEPOSIT";
  reference: string;
  description: string;
}) {
  const user = db.users.find((entry) => entry.id === input.userId);

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  if (input.direction === "DEBIT" && user.coins < input.amount) {
    throw new AppError(400, "Insufficient coins.");
  }

  user.coins += input.direction === "CREDIT" ? input.amount : -input.amount;
  user.updatedAt = new Date().toISOString();

  const transaction = {
    id: makeId("coin"),
    userId: input.userId,
    amount: input.amount,
    type: input.type,
    direction: input.direction,
    reference: input.reference,
    description: input.description,
    createdAt: new Date().toISOString(),
  };

  db.coinTransactions.unshift(transaction);
  void enqueueCoinUpdate(transaction);

  return transaction;
}

export function getWallet(userId: string) {
  const user = db.users.find((entry) => entry.id === userId);

  if (!user) {
    throw new AppError(404, "User not found.");
  }

  return {
    balance: user.coins,
    history: db.coinTransactions.filter((entry) => entry.userId === userId).slice(0, 20),
  };
}

export function holdEscrow(userId: string, amount: number, reference: string, description: string) {
  return recordTransaction({
    userId,
    amount,
    direction: "DEBIT",
    type: "ESCROW_HOLD",
    reference,
    description,
  });
}

export function releaseEscrow(
  userId: string,
  amount: number,
  reference: string,
  description: string,
) {
  return recordTransaction({
    userId,
    amount,
    direction: "CREDIT",
    type: "ESCROW_RELEASE",
    reference,
    description,
  });
}

export function refundEscrow(userId: string, amount: number, reference: string, description: string) {
  return recordTransaction({
    userId,
    amount,
    direction: "CREDIT",
    type: "REFUND",
    reference,
    description,
  });
}

export function transferCoins(input: {
  fromUserId: string;
  toUserId: string;
  amount: number;
  description: string;
}) {
  recordTransaction({
    userId: input.fromUserId,
    amount: input.amount,
    direction: "DEBIT",
    type: "SPEND",
    reference: `${input.fromUserId}:${input.toUserId}`,
    description: input.description,
  });

  return recordTransaction({
    userId: input.toUserId,
    amount: input.amount,
    direction: "CREDIT",
    type: "EARN",
    reference: `${input.fromUserId}:${input.toUserId}`,
    description: input.description,
  });
}
