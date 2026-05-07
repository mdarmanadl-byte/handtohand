import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import { getWallet, transferCoins } from "./coins.service";

export async function wallet(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(res, getWallet(req.user.id), "Wallet fetched.");
}

export async function transfer(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(
    res,
    transferCoins({
      fromUserId: req.user.id,
      toUserId: req.body.toUserId,
      amount: req.body.amount,
      description: req.body.description,
    }),
    "Coins transferred.",
  );
}
