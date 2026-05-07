import { z } from "zod";

export const geofenceSchema = z.object({
  placeId: z.string().min(1),
});
