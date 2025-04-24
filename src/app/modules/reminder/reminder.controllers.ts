import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { reminder_services } from "./reminder.services";

/**
 * Controllers for the `/reminders` resource.
 * Each handler is wrapped with `catch_async` to forward async errors
 * to Express’s centralized error‑handler.
 *
 * Stub implementations ➜ add business logic as needed.
 */

// GET /reminders
const fetch_all = catch_async(async (req, res) => {
  const result = await reminder_services.fetch_all_from_db(req.query, req.user);

  send_response(res, {
    message: "Reminders fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// GET /reminders/:id
const fetch_one = catch_async(async (req, res) => {
  const result = await reminder_services.fetch_one_from_db(
    req.params.id,
    req.user,
  );

  send_response(res, {
    message: "Reminder fetched successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// POST /reminders
const create_one = catch_async(async (req, res) => {
  const result = await reminder_services.create_one_on_db(req.body);

  send_response(res, {
    message: "Reminder created successfully.",
    data: result,
    status: httpStatus.CREATED,
  });
});

// PUT /reminders/:id
const update_one = catch_async(async (req, res) => {
  const result = await reminder_services.update_one_from_db(
    req.body,
    req.params.id,
  );

  send_response(res, {
    message: "Reminder updated successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

// DELETE /reminders/:id
const delete_one = catch_async(async (req, res) => {
  const result = await reminder_services.delete_one_from_db(req.params.id);

  send_response(res, {
    message: "Reminder deleted successfully.",
    data: result,
    status: httpStatus.OK,
  });
});

export const reminder_controllers = {
  fetch_all,
  fetch_one,
  create_one,
  update_one,
  delete_one,
};
