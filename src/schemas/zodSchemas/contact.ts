import { z } from "zod";

export const createContactSchema = z
    .object({
        name: z.string(),
        email: z.string().email(),
        company_type: z.enum(["person", "company"]),
        lang: z.enum(["en_US", "es_ES"]),
        street: z.string(),
        city: z.string(),
        state_id: z.number(),
        zip: z.number(),
        country_id: z.number(),
        mobile: z.string(),
        phone: z.string(),
        x_studio_preferred_contact_method: z.enum(["email", "phone", "mobile"]),
    })
    .strict();
