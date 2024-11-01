"use client";
import backend from "@/shared/backend";
import style from "../index.module.css";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddProject = () => {
    const router = useRouter();
    const [datas, setDatas] = useState({
        name: "",
        defaultLanguage: "",
        availableLanguage: [] as string[],
    });
    const languages = [
        { key: "ru", value: "Russian" },
        { key: "en", value: "English" },
        { key: "uz", value: "Uzbek" },
        { key: "de", value: "German" },
        { key: "kz", value: "Kazak" },
        { key: "fr", value: "French" },
        { key: "sp", value: "Spanish" },
        { key: "jp", value: "Japanese" },
        { key: "ue", value: "Ukrainian" },
        { key: "ar", value: "Arabic" },
    ];
    const HandleSubmit = (e: any) => {
        e.preventDefault();
        backend.addProject(datas).then((data) => {
            if (data) {
                router.push("/projects");
            }
        });
    };
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <p>Проекты</p> / <p>Добавить проект</p>
                </div>
                <form className={style.form}>
                    <label className={style.label} htmlFor="name">
                        Название
                    </label>
                    <input
                        required
                        onChange={(e) =>
                            setDatas({ ...datas, name: e.target.value })
                        }
                        className={style.input}
                        type="text"
                        id="name"
                        name="name"
                    />
                    <Select
                        label="Язык по умолчанию"
                        labelPlacement="outside"
                        onChange={(e) =>
                            setDatas({
                                ...datas,
                                defaultLanguage: e.target.value,
                            })
                        }
                        placeholder="Выберите язык"
                        className="w-full"
                        isRequired
                    >
                        {languages.map((language) => (
                            <SelectItem key={language.key}>
                                {language.value}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select
                        label="Доступные языки"
                        labelPlacement="outside"
                        isRequired
                        placeholder="Выберите язык"
                        variant="bordered"
                        selectionMode="multiple"
                        className={style.select}
                        onChange={(e) => {
                            const selectedValues = e.target.value.split(',').map((item: string) => item.trim());
                            setDatas({
                                ...datas,
                                availableLanguage: selectedValues,
                            });
                        }}
                    >
                        {languages.map((language) => (
                            <SelectItem
                                className={style.selected}
                                key={language.key}
                            >
                                {language.value}
                            </SelectItem>
                        ))}
                    </Select>
                    <div className=" flex gap-2">
                        <Button
                            color="primary"
                            isDisabled={
                                !datas?.availableLanguage ||
                                !datas?.defaultLanguage ||
                                !datas?.name
                                    ? true
                                    : false
                            }
                            onClick={HandleSubmit}
                            type="submit"
                        >
                            Создать проект
                        </Button>
                        <Button variant="ghost" type="reset">
                            Отменить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProject;
