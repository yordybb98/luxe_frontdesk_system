import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Client, FormErrors, LeadSource } from "@/types/types";
import { cn } from "@/lib/utils";
import { checkedStyles, errorStyles } from "./styles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getAllStates } from "@/actions/states";
import { State } from "@/types/state";
import { Country } from "@/types/country";
import { getAllCountries } from "@/actions/countries";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function StepForm({ step, formData, updateForm, errors }: { step: number; formData: Client; updateForm: (key: keyof Client, value: Client[keyof Client]) => void; errors: FormErrors }) {
    const [allStates, setAllStates] = useState<State[]>([]);
    const [loadingAllStates, setLoadingAllStates] = useState<boolean>(false);
    const [allCountries, setAllCountries] = useState<Country[]>([]);
    const [loadingAllCountries, setLoadingAllCountries] = useState<boolean>(false);

    const loadAllStates = async () => {
        try {
            setLoadingAllStates(true);
            const fetchedStates = await getAllStates();
            setAllStates(fetchedStates);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoadingAllStates(false);
        }
    };

    const loadAllCountries = async () => {
        try {
            setLoadingAllCountries(true);
            const fetchedCountries = await getAllCountries();
            setAllCountries(fetchedCountries);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoadingAllCountries(false);
        }
    };

    useEffect(() => {
        if (step === 2) {
            loadAllStates();
            loadAllCountries();
        }
    }, [step]);

    const leadSourceOptions: { value: LeadSource; label: string }[] = [
        { value: "google", label: "Google" },
        { value: "facebook", label: "Facebook" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "referred", label: "Friend/Family" },
        { value: "other", label: "Other" },
    ];

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

                        <div className="flex space-y-2 justify-between">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="state">How did you hear about us?</Label>
                                <div className="overflow-hidden flex-wrap">
                                    <RadioGroup value={formData.leadSource} onValueChange={(value) => updateForm("leadSource", value)}>
                                        {leadSourceOptions.map(({ value, label }) => (
                                            <div key={value} className="flex items-center space-x-2">
                                                <RadioGroupItem value={value} id={value} className={cn(errors.leadSource && errorStyles, formData.leadSource === value && checkedStyles)} />
                                                <Label htmlFor={value}>{label}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="flex flex-col mt-0 min-w-56 space-y-4 ">
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
                                        <Label htmlFor="company_name">Company Name</Label>
                                        <Input
                                            id="company_name"
                                            placeholder="Type your company name..."
                                            value={formData.company_name}
                                            onChange={(e) => updateForm("company_name", e.target.value)}
                                            className={cn(errors.company_name && errorStyles)}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="street">Street</Label>
                            <Input
                                id="street"
                                placeholder="Type your street..."
                                value={formData.street}
                                onChange={(e) => updateForm("street", e.target.value)}
                                className={cn(errors.street && errorStyles)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    placeholder="Type your city..."
                                    value={formData.city}
                                    onChange={(e) => updateForm("city", e.target.value)}
                                    className={cn(errors.city && errorStyles)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Select onValueChange={(e) => updateForm("state_id", e)} defaultValue={formData.state_id} disabled={loadingAllStates}>
                                    <SelectTrigger>
                                        {loadingAllStates ? (
                                            <div className="flex items-center space-x-3">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span>Loading</span>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="Select an state" className={cn(errors.state_id && errorStyles)} />
                                        )}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="zip">ZIP Code</Label>
                                <Input
                                    id="zip"
                                    type="number"
                                    placeholder="Type your ZIP code..."
                                    value={formData.zip}
                                    onChange={(e) => updateForm("zip", e.target.value)}
                                    className={cn(errors.zip && errorStyles)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>

                                <Select onValueChange={(e) => updateForm("country_id", e)} defaultValue={formData.country_id} disabled>
                                    <SelectTrigger>
                                        {loadingAllCountries ? (
                                            <div className="flex items-center space-x-3">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span>Loading</span>
                                            </div>
                                        ) : (
                                            <SelectValue placeholder="Select a country" className={cn(errors.country_id && errorStyles)} />
                                        )}
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
                                placeholder="example@example.com"
                                value={formData.email}
                                onChange={(e) => updateForm("email", e.target.value)}
                                className={cn(errors.email && errorStyles)}
                            />
                        </div>
                        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    placeholder="####-###-####"
                                    value={formData.mobile}
                                    onChange={(e) => updateForm("mobile", e.target.value)}
                                    className={cn(errors.mobile && errorStyles)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Office Number (Optional)</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="####-###-####"
                                    value={formData.phone}
                                    onChange={(e) => updateForm("phone", e.target.value)}
                                    className={cn(errors.phone && errorStyles)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
