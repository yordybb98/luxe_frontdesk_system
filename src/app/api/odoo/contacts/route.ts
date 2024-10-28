import { NextResponse } from "next/server";
import { createContactSchema } from "@/schemas/zodSchemas/contact";
import { z } from "zod";
import { authenticateFromOdoo, createPartnerOdoo, getAllPartnersOdoo } from "../odoo";

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
        createContactSchema.parse(body);

        const UID = await authenticateFromOdoo();
        const id = await createPartnerOdoo(UID, body);

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
