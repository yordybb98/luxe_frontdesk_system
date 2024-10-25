"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import StepForm from "./stepForm";
import { Client } from "@/types/types";
import { CLIENT_FORM_STEPS } from "@/constants/constants";

export default function ClientForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Client>({
        name: "",
        email: "",
        address: "",
        isCompany: false,
        companyName: "",
        phone: "",
        preferredContact: "email",
        preferredLanguage: "es",
    });

    const updateForm = (key: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, CLIENT_FORM_STEPS));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4 w-full">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Tell us about yourself</h2>
                    <p className="text-gray-600 mt-2">We&apos;re excited to get to know you better!</p>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= i ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                                    {step > i ? <Check className="w-6 h-6" /> : i}
                                </div>
                                <div className="text-xs mt-2 text-gray-500">Step {i}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-purple-600 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${((step - 1) / (CLIENT_FORM_STEPS - 1)) * 100}%` }}></div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col justify-between space-y-6 h-[300px]">
                    <div>
                        <AnimatePresence mode="wait">
                            <StepForm step={step} formData={formData} updateForm={updateForm} />
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1} className={`${step === 1 ? "invisible" : ""}`}>
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <Button type="button" onClick={step === 4 ? () => alert("Form submitted!") : nextStep}>
                            {step === CLIENT_FORM_STEPS ? "Submit" : "Next"}
                            {step !== CLIENT_FORM_STEPS && <ChevronRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
