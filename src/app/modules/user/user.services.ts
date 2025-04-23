import { User } from "@prisma/client";
import { TLoginPayload } from "./user.types";
import prisma_client from "../../utils/prisma";
import bcrypt from "bcrypt";
import { config } from "../../config";
import { generate_token } from "../../utils/jwt";
import http_error from "../../errors/http_error";
import httpStatus from "http-status";

// Authenticate a user and return a signed JWT.
const login_into_db = async (payload: TLoginPayload) => {
  // Lookup user by e‑mail (throws 404 if not found)
  const existing_user = await prisma_client.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  //  Verify password (constant‑time compare)
  const is_matched_password = bcrypt.compareSync(
    payload.password,
    existing_user.password,
  );

  if (!is_matched_password) {
    throw new http_error(httpStatus.UNAUTHORIZED, "Password not matched.");
  }

  // Create JWT token
  const token = generate_token(existing_user, config.jwt_secret as string);

  // Return token
  return { token };
};

// Persist a new user and return a sinned jwt
const register_into_db = async (payload: User) => {
  // Clone to avoiding mutating original object
  const user_data = { ...payload };

  // Hash password before store
  const hashed_password = bcrypt.hashSync(
    payload.password,
    Number(config.bcrypt_salt),
  );
  if (hashed_password) {
    user_data.password = hashed_password;
  }

  // Write to DB
  const result = await prisma_client.user.create({
    data: user_data,
    select: { id: true, email: true, name: true, created_at: true },
  });

  // Create JWT token
  const token = generate_token(result, config.jwt_secret as string);

  // Return token
  return { token };
};

export const user_services = { login_into_db, register_into_db };
