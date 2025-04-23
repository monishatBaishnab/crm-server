import { z } from "zod";

/* Schema used when adding a new project                    */
const project_create_schema = z.object({
  client_id: z.string({ required_error: "Client ID is required." }),
  title: z.string({ required_error: "Project title is required." }),
  budget: z.string({ required_error: "Budget is required." }),
  deadline: z.coerce
    .date({ required_error: "Deadline is required." })
    .min(new Date(), { message: "Deadline must be in the future." }),
  status: z.enum(
    ["IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"],
    { required_error: "Status is required." },
  ),
  description: z.string().optional().nullable(),
});

/* Schema used when updating an existing project            */
const project_update_schema = project_create_schema.partial();

export const project_schemas = {
  project_create_schema,
  project_update_schema,
};
