import { z } from "zod";

/*  Reminder – Create payload                                         */
const reminder_create_schema = z.object({
  user_id: z.string({ required_error: "User ID is required." }),
  project_id: z.string().optional().nullable(),
  client_id: z.string().optional().nullable(),
  title: z.string({ required_error: "Title is required." }),
  due_at: z.coerce
    .date({ required_error: "Due date is required." })
    .min(new Date(), { message: "Due date must be in the future." }),
  is_completed: z.boolean().default(false),
});

/*  Reminder – Update payload (all fields optional)                    */
const reminder_update_schema = reminder_create_schema.partial();

export const reminder_schemas = {
  reminder_create_schema,
  reminder_update_schema,
};
