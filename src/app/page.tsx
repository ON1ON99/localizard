"use client";
import Add from "@/components/add/add";
import Tables from "@/components/pageTable";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }),[];

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
            <Add name="Проекты" key="projects" />
            <Tables />
        </div>
    );
}
