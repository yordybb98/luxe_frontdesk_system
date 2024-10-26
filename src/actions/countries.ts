"use server";
import { authenticateFromOdoo, getAllCountriesOdoo } from "@/app/api/odoo/odoo";
import { Country } from "@/types/country";

export async function getAllCountries(): Promise<Country[]> {
    try {
        const UID = await authenticateFromOdoo();
        const res = (await getAllCountriesOdoo(UID)) as Country[];
        return res;
    } catch (error: any) {
        throw error;
    }
}
