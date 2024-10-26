"use server";
import { authenticateFromOdoo, getStatesByCountryOdoo } from "@/app/api/odoo/odoo";
import { State } from "@/types/state";

export async function getAllStates(): Promise<State[]> {
    try {
        const UID = await authenticateFromOdoo();
        const res = (await getStatesByCountryOdoo(UID, 233)) as State[];

        return res;
    } catch (error: any) {
        throw error;
    }
}
