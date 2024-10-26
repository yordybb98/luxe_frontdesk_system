"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import StepForm from "./stepform/stepForm";
import { Client, FormErrors } from "@/types/types";
import { CLIENT_FORM_STEPS } from "@/constants/constants";
import SuccessModal from "./successModal";
import { toast } from "react-toastify";
import { stat } from "fs";

export default function ClientForm() {
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Client>({
        name: "",
        isCompany: false,
        companyName: "",
        street: "",
        city: "",
        state_id: "18",
        zip: "",
        country_id: "233",
        email: "",
        mobile: "",
        phone: "",
        preferredContactMethod: "email",
        lang: "es_ES",
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const updateForm = (key: keyof Client, value: Client[keyof Client]) => {
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: null }));
        }
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const validateSteps = () => {
        const newErrors: FormErrors = {};
        switch (step) {
            case 1:
                if (!formData.name) newErrors["name"] = "Name is required.";
                //if (formData.isCompany && !formData.companyName) newErrors["companyName"] = "Company Name is required.";
                break;
            case 2:
                if (!formData.street) newErrors["street"] = "Street is required.";
                if (!formData.city) newErrors["city"] = "City is required.";
                if (!formData.state_id) newErrors["state_id"] = "State is required.";
                if (!formData.zip) newErrors["zip"] = "Zip Code is required.";
                break;
            case 3:
                if (!formData.email) newErrors["email"] = "Email is required.";
                if (!formData.mobile) newErrors["mobile"] = "Mobile Number is required.";
                if (!formData.preferredContactMethod) newErrors["preferredContactMethod"] = "Preferred Contact is required.";
                break;
            default:
                return {};
        }

        const hasErrors: boolean = Object.keys(newErrors).length > 0;
        if (hasErrors) {
            setErrors(newErrors);
        }

        // Return errors if any, else null
        return hasErrors ? newErrors : null;
    };

    const nextStep = () => {
        const errors = validateSteps();
        if (errors) {
            toast.error(() => (
                <div>
                    <ul>
                        {Object.entries(errors).map(([key, value]) => (
                            <li key={key}>{value}</li>
                        ))}
                    </ul>
                </div>
            ));
        } else {
            if (step === CLIENT_FORM_STEPS) {
                handleSubmit();
            } else setStep((prev) => Math.min(prev + 1, CLIENT_FORM_STEPS));
        }
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async () => {
        try {
            const { isCompany, companyName, preferredContactMethod, ...restOfFormData } = formData;
            const normalizedData = {
                ...restOfFormData,
                state_id: +formData.state_id,
                country_id: +formData.country_id,
                company_type: formData.isCompany ? "company" : "person",
                zip: +formData.zip,
                x_studio_preferred_contact_method: formData.preferredContactMethod,
            };
            const res = await fetch("/api/odoo/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(normalizedData),
            });

            if (!res.ok) {
                const error: ErrorResponse = await res.json();

                const errorMessages = error.message
                    .map((error) => {
                        return `${error.message}`;
                    })
                    .join(" ");

                throw new Error(errorMessages);
            }

            setIsModalOpen(true);
        } catch (error: any) {
            console.error({ error });
            toast.error(error.message);
        }
    };

    const handleFinish = () => {
        setIsModalOpen(false);
        setStep(1);
        setFormData({
            name: "",
            isCompany: false,
            companyName: "",
            street: "",
            city: "",
            state_id: "18",
            zip: "",
            country_id: "233",
            email: "",
            mobile: "",
            phone: "",
            preferredContactMethod: "email",
            lang: "es_ES",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-400 to-indigo-200 flex items-center justify-center p-4 w-full">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 ">Register in Luxe Graphics</h2>
                    <p className="text-gray-600 mt-2">We&apos;re excited to get to know you better!</p>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        step > i ? "bg-green-500 text-white" : step === i ? "border-green-500 border-2" : "bg-gray-200 text-gray-600"
                                    }`}
                                >
                                    {step > i ? <Check className="w-6 h-6" /> : i}
                                </div>
                                <div className="text-xs mt-2 text-gray-500">Step {i}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${((step - 1) / (CLIENT_FORM_STEPS - 1)) * 100}%` }}></div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col justify-between space-y-6 h-[320px]">
                    <div>
                        <AnimatePresence mode="wait">
                            <StepForm step={step} formData={formData} updateForm={updateForm} errors={errors} />
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className={`${step === 1 ? "invisible" : ""}`}>
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <Button type="button" onClick={nextStep} className="bg-green-500 hover:bg-green-600">
                            {step === CLIENT_FORM_STEPS ? "Submit" : "Next"}
                            {step !== CLIENT_FORM_STEPS && <ChevronRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>
                </form>
            </div>

            <SuccessModal isOpen={isModalOpen} onClose={handleFinish} title="Registration Successful" message="Thank you for being part of the Luxe Graphics family!" />
        </div>
    );
}
