import { z } from "zod";

export const createTripSchema = z.object({
  title: z.string().min(3),
  startPlaceId: z.string().min(1),
  destinationLabel: z.string().min(2),
  departureInMinutes: z.coerce.number().int().min(5).max(360),
  availableSlots: z.coerce.number().int().min(1).max(10),
  geofenceTag: z.string().min(2),
  notes: z.string().min(2),
});

export const attachTripRequestSchema = z.object({
  requestId: z.string().min(1),
});
