import { NextResponse } from "next/server";
import { authenticateFromOdoo, getAllPartners, getPartnerById } from "../../odoo";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const UID = await authenticateFromOdoo();
        const res = await getPartnerById(UID, +id);

        return NextResponse.json(res);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
