import { NextResponse } from "next/server";
import { authenticateFromOdoo, getAllStatesOdoo } from "../odoo";

export async function GET() {
    try {
        const UID = await authenticateFromOdoo();
        const res = await getAllStatesOdoo(UID);

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
