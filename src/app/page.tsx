"use server";
import ClientForm from "@/components/clientForm";

export default async function Home() {
    return (
        <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-slate-200 w-full">
                <ClientForm />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    );
}
