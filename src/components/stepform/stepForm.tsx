import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Client, FormErrors } from "@/types/types";
import { cn } from "@/lib/utils";
import { baseColor, checkedStyles, errorStyles } from "./styles";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { getAllStates } from "@/actions/states";
import { State } from "@/types/state";
import { Country } from "@/types/country";
import { getAllCountries } from "@/actions/countries";

export default function StepForm({ step, formData, updateForm, errors }: { step: number; formData: Client; updateForm: (key: keyof Client, value: Client[keyof Client]) => void; errors: FormErrors }) {
    const [allStates, setAllStates] = useState<State[]>([]);
    const [allCountries, setAllCountries] = useState<Country[]>([]);

    const loadAllStates = async () => {
        const fetchedStates = await getAllStates();
        setAllStates(fetchedStates);
    };

    const loadAllCountries = async () => {
        const fetchedCountries = await getAllCountries();
        setAllCountries(fetchedCountries);
    };

    useEffect(() => {
        if (step === 2) {
            loadAllStates();
            loadAllCountries();
        }
    }, [step]);

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Type your full name..."
                                value={formData.name}
                                onChange={(e) => updateForm("name", e.target.value)}
                                className={cn(errors.name && errorStyles)}
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
                        {/* {formData.isCompany && (
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
                        )} */}
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
                                <Select onValueChange={(e) => updateForm("state_id", e)} defaultValue={formData.state_id}>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select a timezone" className={cn(errors.state_id && errorStyles)} />
                                    </SelectTrigger>
                                    <SelectContent className="h-[250px]">
                                        {allStates.map((state) => (
                                            <SelectItem key={state.id} value={state.id.toString()}>
                                                {state.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input id="zip" type="number" placeholder="33909" value={formData.zip} onChange={(e) => updateForm("zip", e.target.value)} className={cn(errors.zip && errorStyles)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>

                                <Select onValueChange={(e) => updateForm("country_id", e)} defaultValue={formData.country_id} disabled>
                                    <SelectTrigger className="w-[280px]">
                                        <SelectValue placeholder="Select a timezone" className={cn(errors.country_id && errorStyles)} />
                                    </SelectTrigger>
                                    <SelectContent className="h-[250px]">
                                        {allCountries.map((country) => (
                                            <SelectItem key={country.id} value={country.id.toString()}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                    id="mobile"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.mobile}
                                    onChange={(e) => updateForm("mobile", e.target.value)}
                                    className={cn(errors.mobile && errorStyles)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Office Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={formData.phone}
                                    onChange={(e) => updateForm("phone", e.target.value)}
                                    className={cn(errors.phone && errorStyles)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Preferred Contact Method</Label>
                                <RadioGroup value={formData.preferredContactMethod} onValueChange={(value) => updateForm("preferredContactMethod", value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="email" className={cn(formData.preferredContactMethod === "email" && checkedStyles)} />
                                        <Label htmlFor="email">Email</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mobile" id="mobile" className={cn(formData.preferredContactMethod === "mobile" && checkedStyles)} />
                                        <Label htmlFor="phone">Phone</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="phone" id="phone" className={cn(formData.preferredContactMethod === "phone" && checkedStyles)} />
                                        <Label htmlFor="phone">Office Phone</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-2">
                                <Label>Preferred Contact Language</Label>
                                <RadioGroup value={formData.lang} onValueChange={(value) => updateForm("lang", value)}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="es_ES" id="spanish" className={cn(formData.lang === "es_ES" && checkedStyles, errors.lang && errorStyles)} />
                                        <Label htmlFor="spanish">Spanish</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="en_US" id="english" className={cn(formData.lang === "en_US" && checkedStyles, errors.lang && errorStyles)} />
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
