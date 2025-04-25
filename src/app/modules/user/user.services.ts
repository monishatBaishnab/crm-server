import { User } from "@prisma/client";
import { TLoginPayload } from "./user.types";
import prisma_client from "../../lib/prisma";
import bcrypt from "bcrypt";
import { config } from "../../config";
import { generate_token } from "../../utils/jwt";
import http_error from "../../errors/http_error";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const fetch_states_from_db = async (user: JwtPayload) => {
  // Count total projects
  const totalProjects = await prisma_client.project.count({
    where: { is_deleted: false, client: { user_id: user.id } },
  });

  // Count projects by status
  const inProgressCount = await prisma_client.project.count({
    where: {
      is_deleted: false,
      client: { user_id: user.id },
      status: "IN_PROGRESS",
    },
  });

  const onHoldCount = await prisma_client.project.count({
    where: {
      is_deleted: false,
      client: { user_id: user.id },
      status: "ON_HOLD",
    },
  });

  const completedCount = await prisma_client.project.count({
    where: {
      is_deleted: false,
      client: { user_id: user.id },
      status: "COMPLETED",
    },
  });

  const canceledCount = await prisma_client.project.count({
    where: {
      is_deleted: false,
      client: { user_id: user.id },
      status: "CANCELED",
    },
  });

  // Count total clients
  const totalClients = await prisma_client.client.count({
    where: { is_deleted: false, user_id: user.id },
  });

  // Count reminders due soon
  const remindersDueSoon = await prisma_client.reminder.count({
    where: {
      is_deleted: false,
      user_id: user.id,
      due_at: {
        lt: new Date(new Date().setDate(new Date().getDate() + 7)), // Due within 7 days
      },
    },
  });

  // Count total interactions
  const totalInteractions = await prisma_client.interaction.count({
    where: { is_deleted: false, user_id: user.id },
  });

  // Count total reminders
  const totalReminders = await prisma_client.reminder.count({
    where: { is_deleted: false, user_id: user.id },
  });

  // Return the aggregated statistics
  return {
    totalClients,
    totalProjects,
    totalInteractions,
    totalReminders,
    remindersDueSoon,
    inProgressCount,
    onHoldCount,
    completedCount,
    canceledCount,
  };
};
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

export const user_services = {
  login_into_db,
  register_into_db,
  fetch_states_from_db,
};
