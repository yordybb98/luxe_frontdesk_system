export type Client = {
    name: string;
    isCompany: boolean;
    company_name: string;
    street: string;
    city: string;
    state_id: string;
    zip: string;
    country_id: string;
    email: string;
    mobile: string;
    phone: string;
    preferredContactMethod: "email" | "phone" | "mobile";
    lang: "en_US" | "es_ES";
    leadSource?: LeadSource;
};

export type ClientForm = {
    name: string;
    street: string;
    city: string;
    state_id: number;
    zip: number;
    country_id: number;
    email: string;
    mobile: string;
    phone: string;
    x_studio_preferred_contact_method: "email" | "phone" | "mobile";
    lang: "en_US" | "es_ES";
};

export interface FormErrors {
    name?: string;
    isCompany?: boolean;
    company_name?: string;
    street?: string;
    city?: string;
    state_id?: string;
    zip?: string;
    country_id?: string;
    email?: string;
    mobile?: string;
    phone?: string;
    preferredContactMethod?: string;
    lang?: string;
    leadSource?: string;
}

export type LeadSource = "google" | "facebook" | "instagram" | "tiktok" | "referred" | "other";
