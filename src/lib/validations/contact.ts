import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().max(30).optional(),
  service: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  source: z.string().max(50).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
