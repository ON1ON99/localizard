"use client";
import React from "react";

import UsersList from "@/components/usersTable";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            <div className="flex justify-between w-full">
                <h1 className="text-2xl font-semibold">Пользователи</h1>
                <Button
                    onClick={() => router.push("/admin/dashboard/add")}
                    color="primary"
                >
                    Добавить пользователя
                </Button>
            </div>
            <UsersList />
        </div>
    );
};

export default Dashboard;
