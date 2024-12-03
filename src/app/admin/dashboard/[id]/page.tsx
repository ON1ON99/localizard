"use client";

import backend from "@/shared/backend";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditUser = () => {
    const router = useRouter();
    const path =
        typeof window !== "undefined" ? location.pathname.split("/")[3] : "";

    const [data, setData] = useState({
        // username: "",
        id: 0,
        Password: "",
        role: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (value: string) => {
        setData((prevData) => ({
            ...prevData,
            role: value,
            id: parseInt(path),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        backend.updateUser(path, data);
        router.push("/admin/dashboard");
    };

    return (
        <div className="flex flex-col w-full h-full justify-center items-center p-8 gap-6">
            <h1 className="text-left text-4xl font-bold">
                Изменить пользователя
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-2">
                <label htmlFor="Password">Пароль</label>
                <input
                    name="Password"
                    type="password"
                    className="h-10 p-1 text-xl border-2 rounded-lg"
                    id="Password"
                    onChange={handleInputChange}
                />

                <Select
                    label="Роль"
                    labelPlacement="outside"
                    placeholder="Выберите роль"
                    className="w-full"
                    variant="bordered"
                    onChange={(e) => handleRoleChange(e.target.value)}
                >
                    <SelectItem key="admin" value="admin">
                        Admin
                    </SelectItem>
                    <SelectItem key="user" value="user">
                        User
                    </SelectItem>
                </Select>

                <div className="flex gap-2 mt-4">
                    <Button color="primary" type="submit">
                        Сохранить
                    </Button>
                    <Button
                        onClick={() => router.push("/admin/dashboard")}
                        type="reset"
                        variant="ghost"
                    >
                        Отменить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
