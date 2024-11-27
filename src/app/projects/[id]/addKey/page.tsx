"use client";
// import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "./index.module.css";
import { useEffect, useState, FormEvent } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";
import { languages } from "@/shared/mock_data";

interface Tag {
    id: number;
    name: string;
}

interface Translation {
    languageId: number;
    // language: string;
    text: string;
}

interface GetData {
    namekeys: string;
    parentId: number;
    description: string;
    tags: Tag[];
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
interface Datas extends Omit<GetData, "tags"> {
    tags: number[];
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
    // const [textTranslation, setTextTranslation] = useState<string>("");
    const [projectData, setProjectData] = useState<projectData>({
        name: "",
        defaultLanguageId: 0,
        availableLanguageIds: [],
    });

    const [datas, setDatas] = useState<Datas>({
        namekeys: "",
        description: "",
        tags: [],
        translations: [],
        parentId: 0,
    });

    useEffect(() => {
        backend.tags().then((data) => setTags(data));
        backend.project(path).then((data) => setProjectData(data));
    }, [children, path]);

    useEffect(() => {
        if (projectData?.availableLanguageIds?.length > 0) {
            setDatas((prev: any) => ({
                ...prev,
                parentId: Number(path),
                translations: languages
                    .filter((lang: any) =>
                        projectData?.availableLanguageIds?.includes(lang?.key),
                    )
                    .map((lang) => ({
                        key: lang.key,
                        // language: lang.value,
                        text: "",
                    })),
            }));
        }
    }, [path, projectData]);

    const handleTranslationChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        langKey: string,
    ) => {
        setDatas((prev) => ({
            ...prev,
            translations: prev.translations.map((t: any) =>
                t?.key === langKey
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

    const copyText = (text: string) => {
        const regex = /\@\[(.*?)\]\@/g;
        const matches = text.match(regex);
        if (matches) {
            return matches;
        }
        return null;
    };

    const text = "Hello @[world]@";
    const copy = copyText(text); 


    console.log(copy);



    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <div>Проекты</div>/ <div>Добавить ключ</div>
                </div>
                <h1 className={style.title}>Добавить ключ</h1>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="name">Название ключа</label>
                    <input
                        className={style.input}
                        onChange={(e) =>
                            setDatas({ ...datas, namekeys: e.target.value })
                        }
                        type="text"
                        id="name"
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
                                tags: Array.from(keys, Number),
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
                        .filter((lang) =>
                            projectData?.availableLanguageIds?.includes(lang.key),
                        )
                        .map((item: any) => (
                            <div
                                className={style.input_containers}
                                key={item.key}
                            >
                                <label
                                    className="p-2 border-b-1 text-xs"
                                    htmlFor="text"
                                >
                                    {item.value}
                                </label>
                                <div className="pb-4 pt-2 px-6">
                                    <input
                                        className="p-1 border rounded-lg w-full outline-none"
                                        onChange={(e) =>
                                            handleTranslationChange(e, item.key)
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
