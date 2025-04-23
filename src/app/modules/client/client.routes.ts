import { Router } from "express";
import auth from "../../middlewares/auth"; // ⬅️ JWT / session guard
import { client_controllers } from "./client.controllers";
import validateReq from "../../utils/validate_req";
import { client_schemas } from "./client.schemas";

const router = Router();

/* ------------------------------------------------------------------ */
/*  /clients  – CRUD routes                                            */
/* ------------------------------------------------------------------ */

// GET /clients          → list clients (protected)
router.get("/", auth, client_controllers.fetch_all);

// GET /clients/:id      → get single client
router.get("/:id", auth, client_controllers.fetch_one);

// POST /clients         → create client
router.post(
  "/",
  auth,
  validateReq(client_schemas.client_create_schema), // payload validation
  client_controllers.create_one,
);

// PUT /clients/:id      → update client
router.put(
  "/:id",
  auth,
  validateReq(client_schemas.client_update_schema),
  client_controllers.update_one,
);

// DELETE /clients/:id   → soft‑delete client
router.delete("/:id", auth, client_controllers.delete_one);

export const client_routes = router;
