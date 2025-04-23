import { z } from "zod";

/* Client – Create payload                                         */
const client_create_schema = z.object({
  user_id: z.string({ required_error: "User ID is required." }),
  name: z.string({ required_error: "Name is required." }),
  email: z.string({ required_error: "Please enter a valid email address." }),
  phone: z.string({ required_error: "Phone number is required." }),
  company: z.string().optional().nullable(),
});

/* Client – Update payload (all fields optional)                    */
const client_update_schema = client_create_schema.partial();

export const client_schemas = {
  client_create_schema,
  client_update_schema,
};
