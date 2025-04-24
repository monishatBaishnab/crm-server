import { Prisma, Project } from "@prisma/client";
import prisma_client from "../../lib/prisma";
import { flushCompileCache } from "module";

/* ------------------------------------------------------------------ */
/*  Project‑‑ Service functions                                       */
/*  (Business‑logic layer; controllers call these)                    */
/* ------------------------------------------------------------------ */

/**
 * Fetch a paginated, filterable list of projects.
 * @param query  Arbitrary filter/sort/pagination params from the controller.
 */
const fetch_all_from_db = async (query: Record<string, unknown>) => {
  // Basic pagination + soft‑delete guard
  const page = Number(query.page) || 1;
  const perPage = Number(query.limit) || 10;

  const searchFields = ["title"];

  const where = [];

  const searchTerm = query?.searchTerm;
  if (searchTerm) {
    where.push({
      OR: searchFields.map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  const title = query?.title;
  const status = query?.status;

  if (title) {
    where.push({
      title,
    });
  }
  if (status) {
    where.push({
      status,
    });
  }

  const projects = await prisma_client.project.findMany({
    where: { is_deleted: false, AND: where },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy: { created_at: "desc" },
  });

  const total = await prisma_client.project.count({
    where: { is_deleted: false, AND: where },
  });

  return { data: projects, meta: { total, page, perPage } };
};

/**
 * Fetch a single project by ID, 404 if not found or deleted.
 */
const fetch_one_from_db = async (id: string) => {
  return prisma_client.project.findUnique({
    where: { id, is_deleted: false },
  });
};

/**
 * Create a new project record.
 */
const create_one_on_db = async (payload: Project) => {
  await prisma_client.client.findUniqueOrThrow({
    where: { id: payload.client_id, is_deleted: false },
  });

  return prisma_client.project.create({
    data: payload,
  });
};

/**
 * Update an existing project(partial payload).
 */
const update_one_from_db = async (payload: Partial<Project>, id: string) => {
  await prisma_client.project.findUniqueOrThrow({
    where: { id },
  });

  if (payload?.client_id) {
    await prisma_client.client.findUniqueOrThrow({
      where: { id: payload.client_id, is_deleted: false },
    });
  }

  return prisma_client.project.update({
    where: { id },
    data: payload,
  });
};

/**
 * Soft‑delete a project(sets is_deleted = true).
 * Use `delete()` if you prefer hard deletes.
 */
const delete_one_from_db = async (id: string) => {
  await prisma_client.project.findUniqueOrThrow({
    where: { id },
  });

  await prisma_client.project.update({
    where: { id },
    data: { is_deleted: true },
  });

  return {};
};

export const project_services = {
  fetch_all_from_db,
  fetch_one_from_db,
  create_one_on_db,
  update_one_from_db,
  delete_one_from_db,
};
