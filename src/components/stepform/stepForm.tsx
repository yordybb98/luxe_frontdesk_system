import React from "react";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Client, FormErrors } from "@/types/types";
import { cn } from "@/lib/utils";
import { baseColor, checkedStyles, errorStyles } from "./styles";

export default function StepForm({ step, formData, updateForm, errors }: { step: number; formData: Client; updateForm: (key: keyof Client, value: Client[keyof Client]) => void; errors: FormErrors }) {
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={(e) => updateForm("fullName", e.target.value)}
                                className={cn(errors.fullName && errorStyles)}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isCompany"
                                checked={formData.isCompany}
                                onCheckedChange={(checked) => updateForm("isCompany", checked)}
                                className={cn(formData.isCompany && `data-[state=checked]:bg-green-500`, "transition duration-200 ease-in-out")}
                            />
                            <Label htmlFor="isCompany">Is this for a company?</Label>
                        </div>
                        {formData.isCompany && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input
                                    id="companyName"
                                    placeholder="Acme Inc."
                                    value={formData.companyName}
                                    onChange={(e) => updateForm("companyName", e.target.value)}
                                    className={cn(errors.companyName && errorStyles)}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="street">Street</Label>
                            <Input
                                id="street"
                                placeholder="1056 Pine Island Rd"
                                value={formData.street}
                                onChange={(e) => updateForm("street", e.target.value)}
                                className={cn(errors.street && errorStyles)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Cape Coral" value={formData.city} onChange={(e) => updateForm("city", e.target.value)} className={cn(errors.city && errorStyles)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" placeholder="Florida" value={formData.state} onChange={(e) => updateForm("state", e.target.value)} className={cn(errors.state && errorStyles)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input
                                    id="zip"
                                    type="number"
                                    placeholder="33909"
                                    value={formData.zipCode}
                                    onChange={(e) => updateForm("zipCode", e.target.value)}
                                    className={cn(errors.zipCode && errorStyles)}
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    placeholder="United States"
                                    value={formData.country}
                                    onChange={(e) => updateForm("country", e.target.value)}
                                    disabled
                                    className={cn(errors.country && errorStyles)}
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => updateForm("email", e.target.value)}
                                className={cn(errors.email && errorStyles)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phoneNumber}
                                    onChange={(e) => updateForm("phoneNumber", e.target.value)}
                                    className={cn(errors.phoneNumber && errorStyles)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Office Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.officeNumber}
                                    onChange={(e) => updateForm("officeNumber", e.target.value)}
                                    className={cn(errors.officeNumber && errorStyles)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Preferred Contact Method</Label>
                                <RadioGroup value={formData.preferredContact} onValueChange={(value) => updateForm("preferredContact", value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="email" className={cn(formData.preferredContact === "email" && checkedStyles, errors.preferredContact && errorStyles)} />
                                        <Label htmlFor="email">Email</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="phone" id="phone" className={cn(formData.preferredContact === "phone" && checkedStyles, errors.preferredContact && errorStyles)} />
                                        <Label htmlFor="phone">Phone</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label>Preferred Contact Language</Label>
                                <RadioGroup value={formData.preferredLanguage} onValueChange={(value) => updateForm("preferredLanguage", value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="es" id="spanish" className={cn(formData.preferredLanguage === "es" && checkedStyles, errors.preferredLanguage && errorStyles)} />
                                        <Label htmlFor="spanish">Spanish</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="en" id="english" className={cn(formData.preferredLanguage === "en" && checkedStyles, errors.preferredLanguage && errorStyles)} />
                                        <Label htmlFor="english">English</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </motion.div>
                );
        }
    };

    return renderStep();
}
