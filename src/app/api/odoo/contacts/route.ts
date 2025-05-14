import { NextResponse } from "next/server";
import { createContactSchema } from "@/schemas/zodSchemas/contact";
import { z } from "zod";
import { authenticateFromOdoo, createPartnerOdoo, getAllPartnersOdoo } from "../odoo";

export type CreateContactDTO = z.infer<typeof createContactSchema>;

export async function GET() {
    try {
        const UID = await authenticateFromOdoo();
        const res = await getAllPartnersOdoo(UID);

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const contact: CreateContactDTO = createContactSchema.parse(body);

        const UID = await authenticateFromOdoo();
        const id = await createPartnerOdoo(UID, contact);

        console.log("**************************");
        console.log("NEW CONTACT CREATED");
        console.log(new Date().toLocaleString("en-US", { timeZone: "Etc/GMT+4" }));
        console.log("Name:", contact.name);
        console.log("Type:", contact.company_type);
        console.log("**************************");

        return NextResponse.json({ id });
    } catch (error: any) {
        //Schema Validations
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors }, { status: 400 });
        }

        // Other errors
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
