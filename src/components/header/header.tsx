"use client";

import Image from "next/image";
import logo from "../../assests/logo.svg";
import style from "./index.module.css";
import avatar from "../../assests/profile_avatar.png";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Select, SelectSection, SelectItem } from "@nextui-org/react";
import en_icon from "../../assests/en.png";
import ru_icon from "../../assests/ru.png";
import uz_icon from "../../assests/uzb.png";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const path = pathname.split("/")[1];
    const [role, setRole] = useState<string | null>(null);
    const languages = [
        {
            key: "en",
            value: en_icon,
        },
        {
            key: "ru",
            value: ru_icon,
        },
        {
            key: "uz",
            value: uz_icon,
        },
    ];

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
                    <li>
                        <Select
                            className="max-w-xs"
                            defaultSelectedKeys={["ru"]}

                            onSelectionChange={(value) => {
                                console.log(value);
                                // setLang(value.currentKey);  
                            }}
                        >
                            {languages.map((language) => (
                                <SelectItem key={language.key}>
                                <Image src={language.value} 
                                width={20} height={20}
                                alt="land_icon" />
                                </SelectItem>
                            ))}
                        </Select>
                    </li>
                    {/* <li><Image src={dark_icon} alt='dark_icon' /></li> */}
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
