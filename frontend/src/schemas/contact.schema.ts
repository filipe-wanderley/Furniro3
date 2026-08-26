import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Your name is required."),
  email: z.string().trim().email("Enter a valid email."),
  subject: z.string().optional(),
  message: z.string().optional(),
});
export type ContactForm = z.infer<typeof contactSchema>;
