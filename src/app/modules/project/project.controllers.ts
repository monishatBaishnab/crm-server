import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { project_services } from "./project.services";

/**
 * Controllers for the `/projects` resource.
 * Each handler is wrapped with `catch_async` to forward async errors
 * to Express’s centralized error‑handler.
 *
 * Stub implementations ➜ add business logic as needed.
 */

// GET /projects
const fetch_all = catch_async(async (req, res) => {
  const result = await project_services.fetch_all_from_db(req.query);

  send_response(res, {
    message: "Projects fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// GET /projects/:id
const fetch_one = catch_async(async (req, res) => {
  const result = await project_services.fetch_one_from_db(req.params.id);

  send_response(res, {
    message: "Project fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// POST /projects
const create_one = catch_async(async (req, res) => {
  const result = await project_services.create_one_on_db(req.body);

  send_response(res, {
    message: "Project created successfully.",
    data: result,
    status: httpStatus.CREATED,
  });
});

// PATCH /projects/:id
const update_one = catch_async(async (req, res) => {
  const result = await project_services.update_one_from_db(
    req.body,
    req.params.id,
  );

  send_response(res, {
    message: "Project updated successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// DELETE /projects/:id
const delete_one = catch_async(async (req, res) => {
  const result = await project_services.delete_one_from_db(req.params.id);

  send_response(res, {
    message: "Project deleted successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

export const project_controllers = {
  fetch_all,
  fetch_one,
  create_one,
  update_one,
  delete_one,
};
