"use server";
import ClientForm from "@/components/clientForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default async function Home() {
    return (
        <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 items-center sm:items-start w-full min-w-[300px] min-h-screen">
                <ClientForm />

                <ToastContainer />
            </main>
        </div>
    );
}
