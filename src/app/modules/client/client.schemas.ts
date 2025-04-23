import { z } from "zod";

const client_create_schema = z.object({
  user_id: z.string({ required_error: "User ID is required." }),
  name: z.string({ required_error: "Name is required." }),
  email: z.string({ required_error: "Please enter a valid email address." }),
  phone: z.string({ required_error: "Phone number is required." }),
  company: z.string().optional().nullable(),
});

const client_update_schema = z.object({
  user_id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional().nullable(),
});

export const client_schemas = { client_create_schema, client_update_schema };
