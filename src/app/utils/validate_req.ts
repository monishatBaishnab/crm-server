import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate_req = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validate_req;
