"use client";
import backend from "@/shared/backend";
import style from "../../index.module.css";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { languages } from "@/shared/mock_data";

const EditProject = () => {
    const router = useRouter();
    const path = location.pathname.split("/")[3];
    const [getData, setGetData] = useState({
        name: "",
        defaultLanguageId: 0,
        availableLanguageIds: [] as number[],
    });
    const [datas, setDatas] = useState({
        name: "",
        defaultLanguageId: 0,
        availableLanguageIds: [] as number[],
    });
    const [languages, setLanguages] = useState<any[]>([]);
    useEffect(() => {
        backend.project(path).then((data) => {
            setGetData(data);
            setDatas(data);
        });
    }, [path]);
    useEffect(() => {
        backend.languages().then((data) => {
            setLanguages(data);
        });
    }, []);

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
                            selectedKeys={[datas.defaultLanguageId.toString()]}   
                            variant="bordered"
                            className={style.select}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys);
                                setDatas({
                                    ...datas,
                                    defaultLanguageId: Number(selectedKey[0]) as number,
                                });
                            }}
                        >
                            {languages.map((language) => (
                                <SelectItem
                                    className={style.selected}
                                    key={(language.id)}
                                >
                                    {language.name}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label="Доступные языки"
                            labelPlacement="outside"
                            isRequired
                            placeholder="Выберите язык"
                            selectedKeys={new Set(datas.availableLanguageIds.toString().split(","))}
                            variant="bordered"
                            selectionMode="multiple"
                            className={style.select}
                            onSelectionChange={(keys) => {
                                setDatas({
                                    ...datas,
                                    availableLanguageIds: Array.from(keys, Number) as number[],
                                });
                            }}
                        >
                            {languages.map((language) => (
                                <SelectItem
                                    className={style.selected}
                                    key={language.id}
                                >
                                    {language.name}
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
