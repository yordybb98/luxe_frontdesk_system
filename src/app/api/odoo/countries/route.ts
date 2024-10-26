import { NextResponse } from "next/server";
import { authenticateFromOdoo, getAllCountriesOdoo } from "../odoo";

export async function GET() {
    try {
        const UID = await authenticateFromOdoo();
        const res = await getAllCountriesOdoo(UID);

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
