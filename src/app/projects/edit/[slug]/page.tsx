"use client";
import backend from "@/shared/backend";
import style from "../../index.module.css";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { languages } from "@/shared/mock_data";

const EditProject = () => {
    const router = useRouter();
    const path = location.pathname.split("/")[3];
    const [getData, setGetData] = useState({
        name: "",
        defaultLanguage: "",
        AvailableLanguageIds: [] as string[],
    });
    const [datas, setDatas] = useState({
        name: "",
        defaultLanguage: "",
        AvailableLanguageIds: [] as string[],
    });

    useEffect(() => {
        backend.project(path).then((data) => {
            setGetData(data);
            setDatas(data); // initialize datas with fetched data
        });
    }, [path]);

    const handleSubmit = (e: any) => {
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
                            selectedKeys={[datas.defaultLanguage]}
                            variant="bordered"
                            className={style.select}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys).join(""); // single select, so join one element
                                setDatas({
                                    ...datas,
                                    defaultLanguage: selectedKey,
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
                        <Select
                            label="Доступные языки"
                            labelPlacement="outside"
                            isRequired
                            placeholder="Выберите язык"
                            selectedKeys={new Set(datas.AvailableLanguageIds)}
                            variant="bordered"
                            selectionMode="multiple"
                            className={style.select}
                            onSelectionChange={(keys) => {
                                setDatas({
                                    ...datas,
                                    AvailableLanguageIds: Array.from(keys) as string[],
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
                        <div className="flex gap-2">
                            <Button
                                color="primary"
                                onClick={handleSubmit}
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
