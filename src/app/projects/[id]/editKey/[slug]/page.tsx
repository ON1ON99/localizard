"use client";

import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "./index.module.css";
import { useEffect, useState, FormEvent } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";

interface Tag {
    id: number;
    name: string;
}

interface Translation {
    // id: number;
    languageId: number;
    symbolKey: string;
    text: string;
}

interface GetData {
    key: string;
    projectInfoId: number;
    description: string;
    tagIds: Tag[];
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

const EditKey: React.FC = () => {
    const router = useRouter();
    const path =
        typeof window !== "undefined"
            ? window.location.pathname.split("/")[2]
            : "";
    const keyId =
        typeof window !== "undefined"
            ? window.location.pathname.split("/")[4]
            : "";

    const [tags, setTags] = useState<Tag[]>([]);
    const [languages, setLanguages] = useState<any[]>([]);
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

        if (keyId) {
            backend.translation(keyId).then((data: GetData) => {
                setDatas({
                    ...data,
                    tagIds: data.tagIds.map((tag) => tag.id),
                });
            });
        }
    }, [keyId, path]);

    const handleTranslationChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        langKey: number,
    ) => {
        const inputValue = e.target.value;

        setDatas((prev) => {
            const existingTranslation = prev.translations.find(
                (t) => t.languageId === langKey,
            );

            return {
                ...prev,
                translations: existingTranslation
                    ? prev.translations.map((t) =>
                          t.languageId === langKey
                              ? { ...t, text: inputValue }
                              : t,
                      )
                    : [
                          ...prev.translations,
                          {
                              languageId: langKey,
                              symbolKey: "",
                              text: inputValue,
                          },
                      ],
            };
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        backend
            .updateTranslation(keyId, datas)
            .then(() => {
                setTimeout(() => router.push(`/projects/${path}`), 1000);
            })
            .catch(() => {
                alert("Ошибка при обновлении ключа");
            });
    };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <div>Проекты</div> / <div>Редактировать ключ</div>
                </div>
                <h1 className={style.title}>Редактировать ключ</h1>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="key">Название ключа</label>
                    <input
                        className={style.input}
                        defaultValue={datas.key}
                        onChange={(e) =>
                            setDatas({ ...datas, key: e.target.value })
                        }
                        type="text"
                        id="key"
                    />
                    <label htmlFor="description">Описание</label>
                    <input
                        className={style.input}
                        defaultValue={datas.description}
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
                        selectedKeys={
                            new Set(datas.tagIds.toString().split(","))
                        }
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

                    {languages
                        .filter((lang) =>
                            projectData.availableLanguageIds.includes(lang.id),
                        )
                        .map((item) => (
                            <div
                                className={style.input_containers}
                                key={item.id}
                            >
                                <label>{item.name}</label>
                                <input
                                    className={style.input}
                                    defaultValue={
                                        datas.translations.find(
                                            (t) => t.languageId === item.id,
                                        )?.text || ""
                                    }
                                    onChange={(e) =>
                                        handleTranslationChange(e, item.id)
                                    }
                                    type="text"
                                    placeholder="Введите текст"
                                />
                            </div>
                        ))}

                    <div className="flex gap-2 mb-6">
                        <Button color="primary" type="submit">
                            Сохранить
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.push(`/projects/${path}`)}
                        >
                            Отменить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditKey;
