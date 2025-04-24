import { Interaction } from "@prisma/client";
import prisma_client from "../../lib/prisma";
import { JwtPayload } from "jsonwebtoken";

/* ------------------------------------------------------------------ */
/*  Interaction ‑‑ Service functions                                       */
/*  (Business‑logic layer; controllers call these)                    */
/* ------------------------------------------------------------------ */

/**
 * Fetch a paginated, filterable list of interactions.
 * @param query  Arbitrary filter/sort/pagination params from the controller.
 */
const fetch_all_from_db = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // Basic pagination + soft‑delete guard
  const page = Number(query.page) || 1;
  const perPage = Number(query.limit) || 10;

  const interactions = await prisma_client.interaction.findMany({
    where: { is_deleted: false, user_id: user.id },
    include: {
      client: { select: { id: true, name: true, email: true } },
      project: { select: { id: true, title: true } },
    },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { created_at: "desc" },
  });

  const total = await prisma_client.interaction.count({
    where: { is_deleted: false, user_id: user.id },
  });

  return { data: interactions, meta: { total, page, perPage } };
};

/**
 * Fetch a single interaction by ID, 404 if not found or deleted.
 */
const fetch_one_from_db = async (id: string, user: JwtPayload) => {
  return prisma_client.interaction.findUnique({
    where: { id, is_deleted: false, user_id: user.id },
  });
};

/**
 * Create a new interaction record.
 */
const create_one_on_db = async (payload: Interaction) => {
  await prisma_client.client.findUniqueOrThrow({
    where: { id: payload.client_id, is_deleted: false },
  });

  return prisma_client.interaction.create({
    data: payload,
  });
};

/**
 * Update an existing interaction(partial payload).
 */
const update_one_from_db = async (
  payload: Partial<Interaction>,
  id: string,
) => {
  await prisma_client.interaction.findUniqueOrThrow({
    where: { id },
  });

  if (payload?.client_id) {
    await prisma_client.client.findUniqueOrThrow({
      where: { id: payload.client_id, is_deleted: false },
    });
  }

  return prisma_client.interaction.update({
    where: { id },
    data: payload,
  });
};

/**
 * Soft‑delete a interaction(sets is_deleted = true).
 * Use `delete()` if you prefer hard deletes.
 */
const delete_one_from_db = async (id: string) => {
  await prisma_client.interaction.findUniqueOrThrow({
    where: { id },
  });

  await prisma_client.interaction.update({
    where: { id },
    data: { is_deleted: true },
  });

  return {};
};

export const interaction_services = {
  fetch_all_from_db,
  fetch_one_from_db,
  create_one_on_db,
  update_one_from_db,
  delete_one_from_db,
};
