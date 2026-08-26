import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().trim().email("Enter a valid email."),
    password: z.string().min(6, "Password must contain at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export type SignUpForm = z.infer<typeof signupSchema>;
