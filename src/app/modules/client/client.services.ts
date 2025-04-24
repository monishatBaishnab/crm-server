import { Client, Prisma } from "@prisma/client";
import prisma_client from "../../lib/prisma";
import { JwtPayload } from "jsonwebtoken";

/* ------------------------------------------------------------------ */
/*  Client ‑‑ Service functions                                       */
/*  (Business‑logic layer; controllers call these)                    */
/* ------------------------------------------------------------------ */

/**
 * Fetch a paginated, filterable list of clients.
 * @param query  Arbitrary filter/sort/pagination params from the controller.
 */
const fetch_all_from_db = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // Basic pagination + soft‑delete guard
  const page = Number(query.page) || 1;
  const perPage = Number(query.limit) || 10;

  const searchFields = ["name", "email"];

  const where = [];

  const searchTerm = query?.searchTerm;
  if (searchTerm) {
    where.push({
      OR: searchFields.map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  const name = query?.name;
  const email = query?.email;

  if (name) {
    where.push({
      name,
    });
  }
  if (email) {
    where.push({
      email,
    });
  }

  const clients = await prisma_client.client.findMany({
    where: { is_deleted: false, user_id: user.id, AND: where },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { created_at: "desc" },
  });

  const total = await prisma_client.client.count({
    where: { is_deleted: false, user_id: user.id, AND: where },
  });

  return { data: clients, meta: { total, page, perPage } };
};

/**
 * Fetch a single client by ID, 404 if not found or deleted.
 */
const fetch_one_from_db = async (id: string, user: JwtPayload) => {
  return prisma_client.client.findFirstOrThrow({
    where: { id, is_deleted: false, user_id: user.id },
  });
};

/**
 * Create a new client record.
 */
const create_one_on_db = async (payload: Client) => {
  await prisma_client.user.findUniqueOrThrow({
    where: { id: payload.user_id, is_deleted: false },
  });

  return prisma_client.client.create({
    data: payload,
  });
};

/**
 * Update an existing client (partial payload).
 */
const update_one_from_db = async (payload: Partial<Client>, id: string) => {
  await prisma_client.client.findUniqueOrThrow({
    where: { id, is_deleted: false },
  });

  if (payload.user_id) {
    await prisma_client.user.findUniqueOrThrow({
      where: { id: payload.user_id, is_deleted: false },
    });
  }

  return prisma_client.client.update({
    where: { id },
    data: payload,
  });
};

/**
 * Soft‑delete a client (sets is_deleted = true).
 * Use `delete()` if you prefer hard deletes.
 */
const delete_one_from_db = async (id: string) => {
  await prisma_client.client.findUniqueOrThrow({
    where: { id, is_deleted: false },
  });

  await prisma_client.client.update({
    where: { id },
    data: { is_deleted: true },
  });
  return {};
};

export const client_services = {
  fetch_all_from_db,
  fetch_one_from_db,
  create_one_on_db,
  update_one_from_db,
  delete_one_from_db,
};
