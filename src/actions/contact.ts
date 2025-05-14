import { ClientForm } from "@/types/types";

export const createContact = async (contactData: ClientForm) => {
    const res = await fetch(`/api/odoo/contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
    });

    if (!res.ok) {
        const error: ErrorResponse = await res.json();
        const errorMessages = error.message.map((err) => err.message).join(" ");
        throw new Error(errorMessages);
    }

    return await res.json();
};
