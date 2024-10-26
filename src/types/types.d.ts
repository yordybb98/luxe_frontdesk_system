export type Client = {
    fullName: string;
    isCompany: boolean;
    companyName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    email: string;
    phoneNumber: string;
    officeNumber: string;
    preferredContact: "email" | "phone";
    preferredLanguage: "en" | "es";
};

export interface FormErrors {
    fullName?: string;
    isCompany?: boolean;
    companyName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    email?: string;
    phoneNumber?: string;
    officeNumber?: string;
    preferredContact?: string;
    preferredLanguage?: string;
}
