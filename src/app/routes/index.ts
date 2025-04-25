import { Router } from "express";
import { user_routes } from "../modules/user/user.routes";
import { client_routes } from "../modules/client/client.routes";
import { project_routes } from "../modules/project/project.routes";
import { reminder_routes } from "../modules/reminder/reminder.routes";
import { interaction_routes } from "../modules/interaction/interaction.routes";

const routes = [
  {
    path: "/auth/",
    route: user_routes,
  },
  {
    path: "/clients/",
    route: client_routes,
  },
  {
    path: "/projects/",
    route: project_routes,
  },
  {
    path: "/reminders/",
    route: reminder_routes,
  },
  {
    path: "/interactions/",
    route: interaction_routes,
  },
];

const router = Router();

routes.forEach(({ path, route }) => router.use(path, route));

export const app_routes = router;
