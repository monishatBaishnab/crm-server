import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { interaction_services } from "./interaction.services";

/**
 * Controllers for the `/interactions` resource.
 * Each handler is wrapped with `catch_async` to forward async errors
 * to Express’s centralized error‑handler.
 *
 * Stub implementations ➜ add business logic as needed.
 */

// GET /interactions
const fetch_all = catch_async(async (req, res) => {
  const result = await interaction_services.fetch_all_from_db(
    req.query,
    req.user,
  );

  send_response(res, {
    message: "Interactions fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// GET /interactions/:id
const fetch_one = catch_async(async (req, res) => {
  const result = await interaction_services.fetch_one_from_db(
    req.params.id,
    req.user,
  );

  send_response(res, {
    message: "Interaction fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// POST /interactions
const create_one = catch_async(async (req, res) => {
  const result = await interaction_services.create_one_on_db(req.body);

  send_response(res, {
    message: "Interaction created successfully.",
    data: result,
    status: httpStatus.CREATED,
  });
});

// PATCH /interactions/:id
const update_one = catch_async(async (req, res) => {
  const result = await interaction_services.update_one_from_db(
    req.body,
    req.params.id,
  );

  send_response(res, {
    message: "Interaction updated successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// DELETE /interactions/:id
const delete_one = catch_async(async (req, res) => {
  const result = await interaction_services.delete_one_from_db(req.params.id);

  send_response(res, {
    message: "Interaction deleted successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

export const interaction_controllers = {
  fetch_all,
  fetch_one,
  create_one,
  update_one,
  delete_one,
};
