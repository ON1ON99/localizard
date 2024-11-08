"use client";

import Image from "next/image";
import logo from "../../assests/logo.svg";
import style from "./index.module.css";
import avatar from "../../assests/profile_avatar.png";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Select,
    SelectItem,
} from "@nextui-org/react";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split("/")[1];
    const [role, setRole] = useState<string | null>(null);
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
        new Set(["ru"]),
    );

    useEffect(() => {
        setRole(localStorage.getItem("role"));
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [path, router]);

    const logout = () => {
        if (window) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
        router.push("/login");
    };

    return (
        <div className={style.wrapper}>
            <div className={style.left_container}>
                <div className={style.logo} onClick={() => router.push("/")}>
                    <Image src={logo} alt="logo" />
                </div>
                <div className={style.nav}>
                    {path === "login" ? null : (
                        <ul>
                            <li onClick={() => router.push("/projects")}>
                                Проекты
                            </li>
                            <li onClick={() => router.push("/languages")}>
                                Языки
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div className={style.nav}>
                <ul>
                    <li className="w-full">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="light"
                                    color="default"
                                    className="capitalize"
                                >
                                    <Avatar
                                        alt=""
                                        className="w-6 h-6"
                                        src={`https://flagcdn.com/${Array.from(selectedKeys).map((item: any) => item)}.svg`}
                                    />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={(keys) =>
                                    setSelectedKeys(keys as Set<string>)
                                }
                            >
                                <DropdownItem key="ru">
                                    <Avatar
                                        alt=""
                                        className="w-6 h-6"
                                        src="https://flagcdn.com/ru.svg"
                                    />
                                </DropdownItem>
                                <DropdownItem key="gb">
                                    <Avatar
                                        alt=""
                                        className="w-6 h-6"
                                        src="https://flagcdn.com/gb.svg"
                                    />
                                </DropdownItem>
                                <DropdownItem key="uz">
                                    <Avatar
                                        alt=""
                                        className="w-6 h-6"
                                        src="https://flagcdn.com/uz.svg"
                                    />
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {/* <Select
                            placeholder=""
                            className="w-14"
                            onChange={(e) => {
                                localStorage.setItem("lang", e.target.value);
                                window.location.reload();
                            }}
                            defaultSelectedKeys="ru"
                        >
                            <SelectItem className="w-8 h-8" key="ru" value="ru">
                                <Avatar
                                    alt=""
                                    className="w-6 h-6"
                                    src="https://flagcdn.com/ru.svg"
                                />
                            </SelectItem>
                            <SelectItem className="w-8 h-8" key="en" value="en">
                                <Avatar
                                    alt=""
                                    className="w-6 h-6"
                                    src="https://flagcdn.com/gb.svg"
                                />
                            </SelectItem>
                            <SelectItem className="w-8 h-8" key="uz" value="uz">
                                <Avatar
                                    alt=""
                                    className="w-6 h-6"
                                    src="https://flagcdn.com/uz.svg"
                                />
                            </SelectItem>
                        </Select> */}
                    </li>
                    {path === "login" ? null : (
                        <li>
                            <Button
                                onClick={logout}
                                color="primary"
                                variant="ghost"
                            >
                                Выйти
                            </Button>
                        </li>
                    )}
                    <li
                        onClick={() =>
                            role === "admin"
                                ? router.push("/admin/dashboard")
                                : router.push("/")
                        }
                    >
                        <Image src={avatar} alt="avatar" />
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Header;
