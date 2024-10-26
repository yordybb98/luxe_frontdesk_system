"use server";
import ClientForm from "@/components/clientForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default async function Home() {
    return (
        <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-slate-200 w-full min-w-[300px]">
                <ClientForm />

                <ToastContainer />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    );
}
