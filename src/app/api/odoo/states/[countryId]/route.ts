import { NextResponse } from "next/server";
import { authenticateFromOdoo, getStatesByCountryOdoo } from "../../odoo";

export async function GET(request: Request, { params }: { params: Promise<{ countryId: string }> }) {
    const { countryId } = await params;
    try {
        const UID = await authenticateFromOdoo();
        const res = await getStatesByCountryOdoo(UID, +countryId);

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
