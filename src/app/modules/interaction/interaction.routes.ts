import { Router } from "express";
import auth from "../../middlewares/auth"; // ⬅️ JWT / session guard
import { interaction_controllers } from "./interaction.controllers";
import validate_req from "../../utils/validate_req";
import { interaction_schemas } from "./interaction.schemas";

const router = Router();

/* ------------------------------------------------------------------ */
/*  /interactions  – CRUD routes                                            */
/* ------------------------------------------------------------------ */

// GET /interactions          → list interactions (protected)
router.get("/", auth, interaction_controllers.fetch_all);

// GET /interactions/:id      → get single client
router.get("/:id", auth, interaction_controllers.fetch_one);

// POST /interactions         → create client
router.post(
  "/",
  auth,
  validate_req(interaction_schemas.interaction_create_schema),
  interaction_controllers.create_one,
);

// PUT /interactions/:id      → full update (or PATCH for partial)
router.put(
  "/:id",
  auth,
  validate_req(interaction_schemas.interaction_update_schema),
  interaction_controllers.update_one,
);

// DELETE /interactions/:id   → soft‑delete client
router.delete("/:id", auth, interaction_controllers.delete_one);

export const interaction_routes = router;
