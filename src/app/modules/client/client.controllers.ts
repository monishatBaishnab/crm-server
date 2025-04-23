import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { client_services } from "./client.services";

/**
 * Controllers for the `/clients` resource.
 * Each handler is wrapped with `catch_async` to forward async errors
 * to Express’s centralized error‑handler.
 *
 * Stub implementations ➜ add business logic as needed.
 */

// GET /clients
const fetch_all = catch_async(async (req, res) => {
  const result = await client_services.fetch_all_from_db(req.query);

  send_response(res, {
    message: "Clients fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// GET /clients/:id
const fetch_one = catch_async(async (req, res) => {
  const result = await client_services.fetch_one_from_db(req.params.id);

  send_response(res, {
    message: "Client fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// POST /clients
const create_one = catch_async(async (req, res) => {
  const result = await client_services.create_one_on_db(req.body);

  send_response(res, {
    message: "Client created successfully.",
    data: result,
    status: httpStatus.CREATED,
  });
});

// PATCH /clients/:id
const update_one = catch_async(async (req, res) => {
  const result = await client_services.update_one_from_db(
    req.body,
    req.params.id,
  );

  send_response(res, {
    message: "Client updated successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// DELETE /clients/:id
const delete_one = catch_async(async (req, res) => {
  const result = await client_services.delete_one_from_db(req.params.id);

  send_response(res, {
    message: "Client deleted successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

export const client_controllers = {
  fetch_all,
  fetch_one,
  create_one,
  update_one,
  delete_one,
};
