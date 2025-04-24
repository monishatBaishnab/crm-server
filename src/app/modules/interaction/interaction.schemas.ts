import { z } from "zod";

/*  Interaction – Create payload                                      */

const interaction_create_schema = z.object({
  project_id: z.string({ required_error: "Project ID is required." }),
  client_id: z.string({ required_error: "Client ID is required." }),
  user_id: z.string({ required_error: "User ID is required." }),
  type: z.enum(["CALL", "EMAIL", "MEETING"], {
    required_error: "Interaction type is required.",
  }),
  occurred_at: z.coerce
    .date({ required_error: "Occurred‑at date is required." })
    .max(new Date(), { message: "Occurred‑at cannot be in the future." }),
  notes: z.string().optional().nullable(),
});

/*  Interaction – Update payload (all fields optional)                 */
const interaction_update_schema = interaction_create_schema.partial();

/*  Export bundle                                                      */
export const interaction_schemas = {
  interaction_create_schema,
  interaction_update_schema,
};
