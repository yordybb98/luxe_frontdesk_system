import { NextResponse } from "next/server";
import { authenticateFromOdoo, getAllPartners, getOdooVersion } from "../odoo";

export async function GET() {
    try {
        const UID = await authenticateFromOdoo();
        const res = await getAllPartners(UID);

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        console.log({ request });

        return NextResponse.json({});
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
