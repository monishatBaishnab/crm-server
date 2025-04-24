import { Prisma, Reminder } from "@prisma/client";
import prisma_client from "../../lib/prisma";
import { JwtPayload } from "jsonwebtoken";

/* ------------------------------------------------------------------ */
/*  Reminder ‑‑ Service functions                                       */
/*  (Business‑logic layer; controllers call these)                    */
/* ------------------------------------------------------------------ */

/**
 * Fetch a paginated, filterable list of reminders.
 * @param query  Arbitrary filter/sort/pagination params from the controller.
 */
const fetch_all_from_db = async (
  query: Record<string, unknown>,
  user: JwtPayload,
) => {
  // Extract pagination parameters with sensible defaults
  const page = Number(query.page) || 1;
  const perPage = Number(query.limit) || 10;

  // Build dynamic WHERE clauses based on optional filters
  const where: Prisma.ReminderWhereInput[] = [];

  // Filter: reminders due within the next 7 days
  if (query?.dueSoon) {
    const now = new Date();
    const upperBound = new Date();
    upperBound.setDate(now.getDate() + 7);

    where.push({
      due_at: {
        gte: now,
        lte: upperBound,
      },
    });
  }

  // Filter: completed / not‑completed reminders
  if (query?.isCompleted) {
    where.push({ is_completed: query.isCompleted });
  }

  // Fetch paginated reminders, excluding soft‑deleted rows
  const reminders = await prisma_client.reminder.findMany({
    where: { is_deleted: false, user_id: user.id, AND: where },
    include: {
      client: { select: { id: true, name: true, email: true } },
      project: { select: { id: true, title: true } },
    },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { created_at: "desc" },
  });

  // Compute total count for pagination metadata
  const total = await prisma_client.reminder.count({
    where: { is_deleted: false, AND: where },
  });

  // Return data along with pagination info
  return { data: reminders, meta: { total, page, perPage } };
};

/**
 * Fetch a single reminder by ID, 404 if not found or deleted.
 */
const fetch_one_from_db = async (id: string, user: JwtPayload) => {
  return prisma_client.reminder.findUnique({
    where: { id, is_deleted: false, user_id: user.id },
  });
};

/**
 * Create a new reminder record.
 */
const create_one_on_db = async (payload: Reminder) => {
  // If a client_id was supplied, confirm that client exists and isn't deleted
  if (payload.client_id) {
    await prisma_client.client.findUniqueOrThrow({
      where: { id: payload.client_id, is_deleted: false },
    });
  }

  // If a project_id was supplied, confirm that project exists and isn't deleted
  if (payload.project_id) {
    await prisma_client.project.findUniqueOrThrow({
      where: { id: payload.project_id, is_deleted: false },
    });
  }

  // If a user_id was supplied, confirm that user exists and isn't deleted
  if (payload.user_id) {
    await prisma_client.user.findUniqueOrThrow({
      where: { id: payload.user_id, is_deleted: false },
    });
  }

  return prisma_client.reminder.create({
    data: payload,
  });
};

/**
 * Update an existing reminder(partial payload).
 */
const update_one_from_db = async (payload: Partial<Reminder>, id: string) => {
  // Make sure the reminder we want to update actually exists
  await prisma_client.reminder.findUniqueOrThrow({ where: { id } });

  // If a client_id was supplied, confirm that client exists and isn't deleted
  if (payload.client_id) {
    await prisma_client.client.findUniqueOrThrow({
      where: { id: payload.client_id, is_deleted: false },
    });
  }

  // If a project_id was supplied, confirm that project exists and isn't deleted
  if (payload.project_id) {
    await prisma_client.project.findUniqueOrThrow({
      where: { id: payload.project_id, is_deleted: false },
    });
  }

  // If a user_id was supplied, confirm that user exists and isn't deleted
  if (payload.user_id) {
    await prisma_client.user.findUniqueOrThrow({
      where: { id: payload.user_id, is_deleted: false },
    });
  }

  // All checks passed—apply the updates and return the updated record
  return prisma_client.reminder.update({
    where: { id },
    data: payload,
  });
};

/**
 * Soft‑delete a reminder(sets is_deleted = true).
 * Use `delete()` if you prefer hard deletes.
 */
const delete_one_from_db = async (id: string) => {
  await prisma_client.reminder.findUniqueOrThrow({
    where: { id },
  });

  await prisma_client.reminder.update({
    where: { id },
    data: { is_deleted: true },
  });

  return {};
};

export const reminder_services = {
  fetch_all_from_db,
  fetch_one_from_db,
  create_one_on_db,
  update_one_from_db,
  delete_one_from_db,
};
