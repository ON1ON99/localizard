"use client";
// import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "./index.module.css";
import { useEffect, useState, FormEvent } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";
// import { languages } from "@/shared/mock_data";

interface Tag {
    id: number;
    name: string;
}

interface Translation {
    id: number;
    languageId: number;
    symbolKey: string;
    // language: string;
    text: string;
}

interface GetData {
    key: string;
    projectInfoId: number;
    description: string;
    tagIds: Tag[];
    // fileNameIOS: string;
    // fileNameAndroid: string;
    // fileNameWeb: string;
    translations: Translation[];
}
interface projectData {
    name: string;
    defaultLanguageId: number;
    availableLanguageIds: number[];
}
interface Datas extends Omit<GetData, "tagIds"> {
    tagIds: number[];
}

const AddKey: React.FC = () => {
    const router = useRouter();
    const path =
        typeof window !== "undefined"
            ? window.location.pathname.split("/")[2]
            : "";
    const children =
        typeof window !== "undefined"
            ? window.location.pathname.split("/")[4]
            : "";

    const [tags, setTags] = useState<Tag[]>([]);
    const [languages, setLanguages] = useState<any>([]);
    const [projectData, setProjectData] = useState<projectData>({
        name: "",
        defaultLanguageId: 0,
        availableLanguageIds: [],
    });

    const [datas, setDatas] = useState<Datas>({
        key: "",
        description: "",
        tagIds: [],
        translations: [],
        projectInfoId: 0,
    });

    useEffect(() => {
        backend.tags().then((data) => setTags(data));
        if (path){
            backend.project(path).then((data) => setProjectData(data));
        }
        backend.languages().then((data) => setLanguages(data));
    }, [children, path]);

    const copyText = (text: string) => {
        console.log(text, "text");
        
        const regex = /\@\[(.*?)\]\@/g;
        const matches = text?.match(regex);
        if (matches) {
            return matches;
        }
        return null;
    };

    useEffect(() => {
        const copy = copyText(datas.translations[0]?.text);
        console.log(copy, "copy");
        
        if (copy) {
            const symbolKey = copy[0].replace(/[@\[\]@]/g, "");
            setDatas((prev) => ({
                ...prev,
                translations: prev.translations.map((t: any) =>
                    t?.languageId === datas.translations[0]?.languageId
                        ? {
                              ...t,
                              symbolKey: `@[${symbolKey}]@`,
                          }
                        : t,
                ),
            }));
        }
    }, [datas.translations]);

    useEffect(() => {
        if (projectData?.availableLanguageIds?.length > 0) {
            setDatas((prev: any) => ({
                ...prev,
                projectInfoId: Number(path),
                translations: languages
                    .filter((lang: any) =>
                        projectData?.availableLanguageIds?.includes(lang?.id),
                    )
                    .map((lang: any) => ({
                        languageId: lang?.id,
                        symbolKey: "",
                        text: "",
                    })),
            }));
        }
    }, [path, projectData]);

    const handleTranslationChange = (
        e: any,
        langKey: number,
    ) => {
        setDatas((prev) => ({
            ...prev,
            translations: prev.translations.map((t: any) =>
                t?.languageId === langKey
                    ? {
                          ...t,
                          text: e.target.value,
                      }
                    : t,
            ),
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        backend
            .addTranslation(datas)
            .then((data) => {
                if (data)
                    setTimeout(() => router.push(`/projects/${path}`), 1000);
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alert("Ошибка");
                } else if (err.response.status === 401) {
                    alert("Ошибка");
                } else if (err.response.status === 403) {
                    alert("Ошибка");
                }
            });
    };

    // const checkboxData = [
    //     { key: "ios", label: "IOS" },
    //     { key: "android", label: "Android" },
    //     { key: "web", label: "Web" },
    // ];

    

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <div>Проекты</div>/ <div>Добавить ключ</div>
                </div>
                <h1 className={style.title}>Добавить ключ</h1>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="key">Название ключа</label>
                    <input
                        className={style.input}
                        onChange={(e) =>
                            setDatas({ ...datas, key: e.target.value })
                        }
                        type="text"
                        id="key"
                    />
                    <label htmlFor="description">Описание</label>
                    <input
                        className={style.input}
                        onChange={(e) =>
                            setDatas({ ...datas, description: e.target.value })
                        }
                        type="text"
                        id="description"
                    />

                    <Select
                        label="Теги"
                        labelPlacement="outside"
                        placeholder="Выберите теги"
                        variant="bordered"
                        selectionMode="multiple"
                        onSelectionChange={(keys) =>
                            setDatas({
                                ...datas,
                                tagIds: Array.from(keys, Number),
                            })
                        }
                        isRequired
                    >
                        {tags.map((tag) => (
                            <SelectItem key={tag.id} value={tag.id}>
                                {tag.name}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* <CheckboxGroups
                        setCheckbox={setChecked}
                        value={checked}
                        label="Платформа"
                        data={checkboxData}
                    />

                    <div className={style.file_name}>
                        {["IOS", "Android", "Web"].map((platform) => (
                            <div
                                className={style.file_name_cover}
                                key={platform}
                            >
                                <label
                                    htmlFor={`${platform.toLowerCase()}_name`}
                                >
                                    Имя файла {platform}
                                </label>
                                <input
                                    type="text"
                                    id={`${platform.toLowerCase()}_name`}
                                    onChange={(e) =>
                                        setDatas((prev) => ({
                                            ...prev,
                                            [`fileName${platform as "IOS" | "Android" | "Web"}`]:
                                                e.target.value,
                                        }))}
                                    disabled={
                                        !checked.includes(
                                            platform.toLowerCase(),
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div> */}

                    {languages
                        .filter((lang: any) =>
                            projectData?.availableLanguageIds?.includes(lang.id),
                        )
                        .map((item: any) => (
                            <div
                                className={style.input_containers}
                                key={item.id}
                            >
                                <label
                                    className="p-2 border-b-1 text-xs"
                                >
                                    {item.name}
                                </label>
                                <div className="pb-4 pt-2 px-6">
                                    <input
                                        className="p-1 border rounded-lg w-full outline-none"
                                        onChange={(e) =>
                                            handleTranslationChange(e, item.id)
                                        }
                                        type="text"
                                        placeholder="Введите текст"
                                    />
                                </div>
                            </div>
                        ))}

                    <div className="flex gap-2 mb-6">
                        <Button color="primary" type="submit">
                            Добавить
                        </Button>
                        <Button type="reset" variant="ghost">
                            Отменить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddKey;
