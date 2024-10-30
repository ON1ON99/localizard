"use client";
import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "./index.module.css";
import { useEffect, useState, FormEvent } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";

interface Language {
    key: string;
    lang: string;
}

interface Tag {
    id: number;
    text: string;
}

interface Translation {
    key: string;
    language: string;
    text: string;
}

interface GetData {
    id: number;
    namekeys: string;
    parentId: number;
    description: string;
    tags: Tag[];
    fileNameIOS: string;
    fileNameAndroid: string;
    fileNameWeb: string;
    translations: Translation[];
}

interface Datas extends Omit<GetData, "tags"> {
    tags: number[];
}

const EditKey: React.FC = () => {
    const router = useRouter();
    const path =
        typeof window !== "undefined"
            ? window.location.pathname.split("/")[2]
            : "";
    const children =
        typeof window !== "undefined"
            ? window.location.pathname.split("/")[4]
            : "";

    const [projectData, setProjectData] = useState<any>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [checked, setChecked] = useState<string[]>([]);

    const languages: Language[] = [
        { key: "ru", lang: "Русский" },
        { key: "en", lang: "Английский" },
        { key: "uz", lang: "Узбекский" },
        // ... other languages
        {
            key: "kz",
            lang: "Казахский",
        },
    ];

    const [datas, setDatas] = useState<Datas>({
        id: 0,
        namekeys: "",
        description: "",
        tags: [],
        fileNameIOS: "",
        fileNameAndroid: "",
        fileNameWeb: "",
        translations: [{ key: "", language: "", text: "" }],
        parentId: 0,
    });

    useEffect(() => {
        backend.tags().then((data) => setTags(data));
    }, [children]);

    useEffect(() => {
        if (path) {
            backend.project(path).then((data) => setProjectData(data));
        }
    }, [path]);

    useEffect(() => {
        setDatas((prev) => ({
            ...prev,
            parentId: Number(path)
        }));
    }, [checked, path]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        backend.addTranslation(datas).then((data) => {
            if (data) console.log("Success");
        });
        setTimeout(() => router.push(`/projects/${path}`), 1000);
    };

    const checkboxData = [
        { key: "ios", label: "iOS" },
        { key: "android", label: "Android" },
        { key: "web", label: "Web" },
    ];

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
                                {tag.text}
                            </SelectItem>
                        ))}
                    </Select>

                    <CheckboxGroups
                        setCheckbox={setChecked}
                        value={checked}
                        label="Платформа"
                        data={checkboxData}
                    />

                    <div className={style.file_name}>
                        {["iOS", "Android", "Web"].map((platform) => (
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
                                        }))
                                    }
                                    disabled={
                                        !checked.includes(
                                            platform.toLowerCase(),
                                        )
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div>
                        {projectData?.availableLanguage?.map((lang: any) =>
                            languages?.map((item) =>
                                item.key === lang ? (
                                    <div
                                        className={style.input_containers}
                                        key={item.key}
                                    >
                                        <label htmlFor="text">
                                            {languages?.find(
                                                (l) => l.key === item.key,
                                            )?.lang || "Language not found"}
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setDatas((prev) => ({
                                                    ...prev,
                                                    translations:
                                                        prev.translations.map(
                                                            (t) =>
                                                                t.key ===
                                                                item.key
                                                                    ? {
                                                                          ...t,
                                                                          text: e
                                                                              .target
                                                                              .value,
                                                                      }
                                                                    : t,
                                                        ),
                                                }))
                                            }
                                            type="text"
                                            placeholder="Введите текст"
                                        />
                                    </div>
                                ) : null,
                            ),
                        )}
                    </div>

                    <div className="flex gap-2 my-6">
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

export default EditKey;
