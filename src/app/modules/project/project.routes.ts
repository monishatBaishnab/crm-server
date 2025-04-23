import { Router } from "express";
import auth from "../../middlewares/auth"; // ⬅️ JWT / session guard
import { project_controllers } from "./project.controllers";
import validate_req from "../../utils/validate_req";
import { project_schemas } from "./project.schemas";

const router = Router();

/* ------------------------------------------------------------------ */
/*  /projects  – CRUD routes                                            */
/* ------------------------------------------------------------------ */

// GET /projects          → list projects (protected)
router.get("/", auth, project_controllers.fetch_all);

// GET /projects/:id      → get single client
router.get("/:id", auth, project_controllers.fetch_one);

// POST /projects         → create client
router.post(
  "/",
  validate_req(project_schemas.project_create_schema), // payload validation
  auth,
  project_controllers.create_one,
);

// PUT /projects/:id      → full update (or PATCH for partial)
router.put(
  "/:id",
  validate_req(project_schemas.project_update_schema),
  auth,
  project_controllers.update_one,
);

// DELETE /projects/:id   → soft‑delete client
router.delete("/:id", auth, project_controllers.delete_one);

export const project_routes = router;
