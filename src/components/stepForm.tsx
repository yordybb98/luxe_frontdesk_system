import React from "react";
import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";
import { Client } from "@/types/types";

export default function StepForm({ step, formData, updateForm }: { step: number; formData: Client; updateForm: (key: string, value: string | boolean) => void }) {
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input id="fullname" type="text" placeholder="John Doe" value={formData.name} onChange={(e) => updateForm("name", e.target.value)} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch id="isCompany" checked={formData.isCompany} onCheckedChange={(checked) => updateForm("isCompany", checked)} />
                            <Label htmlFor="isCompany">Is this for a company?</Label>
                        </div>
                        {formData.isCompany && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input id="companyName" placeholder="Acme Inc." value={formData.companyName} onChange={(e) => updateForm("companyName", e.target.value)} />
                            </motion.div>
                        )}
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="street">Street</Label>
                            <Input id="street" placeholder="1056 Pine Island Rd" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="Cape Coral" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" placeholder="Florida" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input id="zip" placeholder="33909" value={formData.address} onChange={(e) => updateForm("address", e.target.value)} />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" placeholder="United States" value={formData.address} disabled />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => updateForm("email", e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Office Number</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" value={formData.phone} onChange={(e) => updateForm("phone", e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Preferred Contact Method</Label>
                                <RadioGroup value={formData.preferredContact} onValueChange={(value) => updateForm("preferredContact", value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="email" />
                                        <Label htmlFor="email">Email</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="phone" id="phone" />
                                        <Label htmlFor="phone">Phone</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label>Preferred Contact Language</Label>
                                <RadioGroup value={formData.preferredLanguage} onValueChange={(value) => updateForm("preferredContact", value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="es" id="spanish" />
                                        <Label htmlFor="spanish">Spanish</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="en" id="english" />
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
