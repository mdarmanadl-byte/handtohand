import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
import { AppError } from "../utils/app-error";

type ValidationSchema = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export function validate(schema: ValidationSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }

      if (schema.params) {
        req.params = schema.params.parse(req.params) as Request["params"];
      }

      if (schema.query) {
        req.query = schema.query.parse(req.query) as Request["query"];
      }

      return next();
    } catch (error) {
      return next(new AppError(400, "Validation failed.", error));
    }
  };
}
