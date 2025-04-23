import { Router } from "express";
import { user_routes } from "../modules/user/user.routes";

const routes = [
  {
    path: "/auth/",
    route: user_routes,
  },
];

const router = Router();

routes.forEach(({ path, route }) => router.use(path, route));

export const app_routes = router;
