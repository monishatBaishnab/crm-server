import { Router } from "express";
import auth from "../../middlewares/auth"; // ⬅️ JWT / session guard
import { reminder_controllers } from "./reminder.controllers";
import validate_req from "../../utils/validate_req";
import { reminder_schemas } from "./reminder.schemas";

const router = Router();

/* ------------------------------------------------------------------ */
/*  /reminders  – CRUD routes                                            */
/* ------------------------------------------------------------------ */

// GET /reminders          → list reminders (protected)
router.get("/", auth, reminder_controllers.fetch_all);

// GET /reminders/:id      → get single client
router.get("/:id", auth, reminder_controllers.fetch_one);

// POST /reminders         → create client
router.post(
  "/",
  auth,
  validate_req(reminder_schemas.reminder_create_schema),
  reminder_controllers.create_one,
);

// PUT /reminders/:id      → full update (or PATCH for partial)
router.put(
  "/:id",
  auth,
  validate_req(reminder_schemas.reminder_update_schema),
  reminder_controllers.update_one,
);

// DELETE /reminders/:id   → soft‑delete client
router.delete("/:id", auth, reminder_controllers.delete_one);

export const reminder_routes = router;
