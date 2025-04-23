import { NextFunction, Request, Response } from "express";
import catch_async from "../utils/catch_async";
import http_error from "../errors/http_error";
import httpStatus from "http-status";
import { verify_token } from "../utils/jwt";
import { config } from "../config";

const auth = catch_async((req: Request, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization || req.cookies?.token;

  if (!token) {
    throw new http_error(httpStatus.UNAUTHORIZED, "You are not authorized.");
  }

  const verified_user = verify_token(token, config.jwt_secret as string);

  if (verified_user) {
    req.user = verified_user;
    next();
  } else {
    throw new http_error(httpStatus.UNAUTHORIZED, "You are not authorized.");
  }
});

export default auth;
