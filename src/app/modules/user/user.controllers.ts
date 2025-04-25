import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { user_services } from "./user.services";
import { config } from "../../config";

const login = catch_async(async (req, res) => {
  const result = await user_services.login_into_db(req.body);

  res.cookie("token", result.token, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  send_response(res, {
    message: "Login successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

const register = catch_async(async (req, res) => {
  const result = await user_services.register_into_db(req.body);

  res.cookie("token", result.token, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  send_response(res, {
    message: "User registered successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

export const user_controllers = { login, register };
