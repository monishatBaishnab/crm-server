import { User } from "@prisma/client";
import { Secret, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

// Define the structure of the token payload
export type TTokenData = {
  id: string;
  email: string;
  name: string;
};

// Function to sanitize and structure user data for token creation
export const sanitize_token_data = (user_data: User): TTokenData => {
  const tokenData = {
    id: user_data.id,
    email: user_data.email,
    name: user_data.name,
  };

  return tokenData;
};

// Function to generate a JSON Web Token (JWT) using the provided payload and secret
export const generate_token = (
  payload: TTokenData,
  secret: Secret,
  expire_in?: string,
) => {
  const validity_time = (
    expire_in ? expire_in : "10d"
  ) as SignOptions["expiresIn"];

  const token = jwt.sign(payload, secret, {
    expiresIn: validity_time,
  });
  return token;
};

// Function to verify the provided token and extract the payload data
export const verify_token = (token: string, secret: Secret): TTokenData => {
  const verified_user = jwt.verify(token, secret);
  return verified_user as TTokenData;
};
