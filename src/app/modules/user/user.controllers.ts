import httpStatus from "http-status";
import catch_async from "../../utils/catch_async";
import send_response from "../../utils/send_response";
import { user_services } from "./user.services";
import { config } from "../../config";

const fetch_states = catch_async(async (req, res) => {
  const result = await user_services.fetch_states_from_db(req.user);

  send_response(res, {
    message: "States fetch successfully.",
    status: httpStatus.OK,
    data: result,
  });
});

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

export const user_controllers = { login, register, fetch_states };
