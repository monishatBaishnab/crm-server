import { z } from "zod";

const register_schema = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string({ required_error: "Password is required" }),
  theme_pref: z.string().optional().nullable(),
});

const login_schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string({ required_error: "Password is required" }),
});

export const user_schemas = { register_schema, login_schema };
