import type { Request, Response } from "express";
import { AppError } from "../../utils/app-error";
import { sendSuccess } from "../../utils/api-response";
import {
  acceptBorrowRequest,
  createBorrowRequest,
  createItem,
  listItems,
  returnBorrowedItem,
} from "./borrowables.service";

export async function getItems(_req: Request, res: Response) {
  return sendSuccess(res, listItems(), "Borrowable items fetched.");
}

export async function postItem(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(res, await createItem(req.user.id, req.body), "Item created.", 201);
}

export async function borrow(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(
    res,
    await createBorrowRequest(String(req.params.itemId), req.user.id, req.body.returnInDays),
    "Borrow request created.",
    201,
  );
}

export async function accept(req: Request, res: Response) {
  if (!req.user) {
    throw new AppError(401, "Authentication required.");
  }

  return sendSuccess(
    res,
    await acceptBorrowRequest(String(req.params.transactionId), req.user.id),
    "Borrow request accepted.",
  );
}

export async function returnItem(req: Request, res: Response) {
  return sendSuccess(
    res,
    await returnBorrowedItem(String(req.params.transactionId)),
    "Borrowable item returned.",
  );
}
