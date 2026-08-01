import { z } from "zod";

export const SERVICE_TYPES = [
  "Mariage",
  "Anniversaire / Baptême",
  "Conférence / Séminaire",
  "Concert / Événement",
  "Vidéo corporate / Publicité",
  "Shooting photo",
  "Formation",
  "Autre",
] as const;

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  phone: z.string().trim().min(8, "Numéro de téléphone invalide."),
  serviceType: z.enum(SERVICE_TYPES, {
    error: "Merci de choisir un type de prestation.",
  }),
  eventDate: z
    .string()
    .trim()
    .min(1, "Merci d'indiquer une date.")
    .refine((val) => !Number.isNaN(Date.parse(val)), "Date invalide."),
  location: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1000, "Message trop long (1000 caractères max).").optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
