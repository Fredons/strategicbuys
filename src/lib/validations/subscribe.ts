import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().max(100).optional(),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
