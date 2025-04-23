import { Router } from "express";
import { user_controllers } from "./user.controllers";
import validate_req from "../../utils/validate_req";
import { user_schemas } from "./user.schemas";

const router = Router();

router.post(
  "/login",
  validate_req(user_schemas.login_schema),
  user_controllers.login,
);

router.post(
  "/register",
  validate_req(user_schemas.register_schema),
  user_controllers.register,
);

export const user_routes = router;
