import { getOdooVersion } from "./odoo";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await getOdooVersion();

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
