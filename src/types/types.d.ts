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
}
