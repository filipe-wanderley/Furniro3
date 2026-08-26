import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
  companyName: z.string().optional(),
  zipCode: z.string().regex(/^\d{8}$/, "Enter an 8-digit ZIP code."),
  country: z.string().trim().min(1, "Country is required."),
  streetAddress: z.string().trim().min(1, "Street address is required."),
  townCity: z.string().trim().min(1, "Town / City is required."),
  province: z.string().trim().min(1, "Province is required."),
  addonAddress: z.string().optional(),
  email: z.string().trim().email("Enter a valid email."),
  additionalInformation: z.string().optional(),
  paymentMethod: z.enum(["bank", "cash"], {
    error: "Choose a payment method.",
  }),
});
export type CheckoutForm = z.infer<typeof checkoutSchema>;
