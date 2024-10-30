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

interface Datas extends Omit<GetData, 'tags'> {
    tags: number[];
}

const EditKey: React.FC = () => {
    const router = useRouter();
    const path = typeof window !== "undefined" ? window.location.pathname.split("/")[2] : "";
    const children = typeof window !== "undefined" ? window.location.pathname.split("/")[4] : "";

    const [projectData, setProjectData] = useState<any>(null);
    const [tags, setTags] = useState<Tag[]>([]);
    const [checked, setChecked] = useState<string[]>([]);
    const [getData, setGetData] = useState<GetData>({
        id: 0,
        namekeys: "",
        description: "",
        tags: [],
        fileNameIOS: "",
        fileNameAndroid: "",
        fileNameWeb: "",
        translations: [],
        parentId: 0,
    });
    
    const languages: Language[] = [
        { key: "ru", lang: "Русский" },
        { key: "en", lang: "Английский" },
        { key: "uz", lang: "Узбекский" },
    ];

    const [datas, setDatas] = useState<Datas>({
        ...getData,
        tags: [],
        translations: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const [project, tagsData, data] = await Promise.all([
                backend.project(path),
                backend.tags(),
                children ? backend.translation(children) : Promise.resolve(null)
            ]);

            setProjectData(project);
            setTags(tagsData);
            if (data) {
                setGetData(data);
                setDatas({
                    ...data,
                    translations: languages.map((lang) => {
                        const translation = data.translations.find((t: { key: string; }) => t.key === lang.key);
                        return translation ? translation : { key: lang.key, language: lang.lang, text: "" };
                    })
                });
            }
        };
        fetchData();
    }, [path, children]);

    const handleTranslationChange = (key: string, text: string) => {
        setDatas((prev) => ({
            ...prev,
            translations: prev.translations.map((t) =>
                t.key === key ? { ...t, text } : t
            ),
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await backend.updateTranslation(children, datas);
        router.push(`/projects/${path}`);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <div>Проекты</div> / <div>{projectData?.name}</div> / <div>Изменить ключ</div>
                </div>
                <h1 className={style.title}>Изменить ключ</h1>
                <form className={style.form} onSubmit={handleSubmit}>
                    <label htmlFor="name">Название ключа</label>
                    <input
                        className={style.input}
                        defaultValue={getData.namekeys}
                        onChange={(e) => setDatas({ ...datas, namekeys: e.target.value })}
                        type="text"
                        id="name"
                    />
                    <label htmlFor="description">Описание</label>
                    <input
                        className={style.input}
                        defaultValue={getData.description}
                        onChange={(e) => setDatas({ ...datas, description: e.target.value })}
                        type="text"
                        id="description"
                    />

                    <Select
                        label="Теги"
                        labelPlacement="outside"
                        placeholder="Выберите теги"
                        variant="bordered"
                        selectionMode="multiple"
                        onSelectionChange={(keys) => setDatas({ ...datas, tags: Array.from(keys, Number) })}
                        isRequired
                    >
                        {tags.map((tag) => (
                            <SelectItem key={tag.id} value={tag.id}>
                                {tag.text}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* <CheckboxGroups setCheckbox={setChecked} value={checked} label="Платформа" data={[
                        { key: "ios", label: "IOS" },
                        { key: "android", label: "Android" },
                        { key: "web", label: "Web" },
                    ]} />

                    <div className={style.file_name}>
                        {["iOS", "Android", "Web"].map((platform) => (
                            <div className={style.file_name_cover} key={platform}>
                                <label htmlFor={`${platform.toLowerCase()}_name`}>Имя файла {platform}</label>
                                <input
                                    type="text"
                                    id={`${platform.toLowerCase()}_name`}
                                    defaultValue={getData[`fileName${platform as 'IOS' | 'Android' | 'Web'}`]}
                                    onChange={(e) => setDatas((prev) => ({ ...prev, [`fileName${platform}`]: e.target.value }))}
                                    disabled={!checked.includes(platform.toLowerCase())}
                                />
                            </div>
                        ))}
                    </div> */}
                    <div className="flex flex-col gap-4">
                        {datas.translations.map(({ key, language, text }) => (
                            <div className={style.input_containers} key={key}>
                                <label className="p-1 border-b-1">{language || "Language not found"}</label>
                                <input
                                    className="p-1"
                                    value={text}
                                    onChange={(e) => handleTranslationChange(key, e.target.value)}
                                    type="text"
                                    placeholder="Введите текст"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 my-6">
                        <Button color="primary" type="submit">Изменить</Button>
                        <Button onClick={() => router.push(`/projects/${path}`)} type="reset" variant="ghost">Отменить</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditKey;
