"use client";
import backend from "@/shared/backend";
import style from "../../index.module.css";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditProject = () => {
    const router = useRouter();
    const path = location.pathname.split("/")[3];
    const [getData, setGetData] = useState({
        name: "",
        defaultLanguage: "",
        availableLanguage: [] as string[],
    });
    const [datas, setDatas] = useState({
        name: "",
        defaultLanguage: "",
        availableLanguage: [] as string[],
    });

    useEffect(() => {
        const path = location.pathname.split("/")[3];
        backend.project(path).then((data) => {
            setGetData(data);
        });
    }, [path]);
    const languages = [
        { key: "ru", label: "Russian" },
        { key: "en", label: "English" },
        { key: "uz", label: "Uzbek" },
        { key: "de", label: "German" },
        { key: "kz", label: "Kazak" },
        { key: "fr", label: "French" },
        { key: "sp", label: "Spanish" },
        { key: "jp", label: "Japanese" },
        { key: "ue", label: "Ukrainian" },
        { key: "ar", label: "Arabic" },
    ];
    const HandleSubmit = (e: any) => {
        e.preventDefault();
        backend.updateProject(path, datas).then(() => {
            setTimeout(() => {
                router.push("/projects");
            }, 1000);
        });
    };
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <p>Проекты</p> / <p>Изменить проект</p>
                </div>
                {getData && (
                    <form className={style.form} aria-required>
                        <label className={style.label} htmlFor="name">
                            Название
                        </label>
                        <input
                            required
                            defaultValue={getData.name}
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
                            isRequired
                            placeholder="Выберите язык"
                            selectedKeys={getData.defaultLanguage}
                            variant="bordered"
                            // selectionMode="multiple"
                            className={style.select}
                            onChange={(e) => {
                                setDatas({
                                    ...datas,
                                    defaultLanguage: e.target.value,
                                });
                            }}
                        >
                            {languages.map((language) => (
                                <SelectItem
                                    className={style.selected}
                                    key={language.key}
                                >
                                    {language.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Доступные языки"
                            labelPlacement="outside"
                            isRequired
                            placeholder="Выберите язык"
                            selectedKeys={getData?.availableLanguage.map(
                                String,
                            )}
                            variant="bordered"
                            selectionMode="multiple"
                            className={style.select}
                            onChange={(e) => {
                                const selectedValues = e.target.value
                                    .split(",")
                                    .map((item: string) => item.trim());
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
                                    {language.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <div className=" flex gap-2">
                            <Button
                                color="primary"
                                onClick={HandleSubmit}
                                type="submit"
                            >
                                Изменить проект
                            </Button>
                            <Button variant="ghost" type="reset">
                                Отменить
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditProject;
