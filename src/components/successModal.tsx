"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export default function SuccessModal({ isOpen, onClose, title = "Success!", message = "Your action has been completed successfully." }: SuccessModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <VisuallyHidden.Root>
                <DialogTitle className="text-center">{title}</DialogTitle>
            </VisuallyHidden.Root>
            <DialogContent className="sm:max-w-md">
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="flex flex-col items-center justify-center p-6">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}>
                                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                            </motion.div>
                            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-2xl font-semibold text-center mb-2">
                                {title}
                            </motion.h2>
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-center text-gray-600 mb-6">
                                {message}
                            </motion.p>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}></motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
