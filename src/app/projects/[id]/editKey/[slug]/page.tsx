"use client";
import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "./index.module.css";
import { useEffect, useState } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";

const AddKey = () => {
    const router = useRouter();
    const path = location.pathname.split("/")[2];
    const children = location.pathname.split("/")[4];
    const [checked, setChecked] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [getData, setGetData] = useState<{
        id: number;
        nameKeys: string;
        parentId: number;
        description: string;
        tags: any;
        fileNameIOS: string;
        fileNameAndroid: string;
        fileNameWeb: string;
        russian: string;
        english: string;
    }>({
        id: 0,
        nameKeys: "",
        tags: [],
        fileNameIOS: "",
        fileNameAndroid: "",
        fileNameWeb: "",
        description: "",

        parentId: 0,
        russian: "",
        english: "",
    });
    const [datas, setDatas] = useState<{
        id: number;
        nameKeys: string;
        parentId: number;
        description: string;
        tags: any;
        fileNameIOS: string;
        fileNameAndroid: string;
        fileNameWeb: string;
        russian: string;
        english: string;
    }>({
        id: 0,
        nameKeys: "",
        tags: [],
        fileNameIOS: "",
        fileNameAndroid: "",
        fileNameWeb: "",
        description: "",
        russian: "",
        english: "",

        parentId: 0,
    });

    useEffect(() => {
        backend.translation(children).then((data) => {
            setGetData(data);
        });

        backend.tags().then((data) => {
            setTags(data);
        });
    }, [children]);

    const checkbox_data = [
        { key: "ios", label: "iOS" },
        { key: "android", label: "Android" },
        { key: "web", label: "Web" },
    ];
    useEffect(() => {
        setDatas((prevDatas) => ({
            ...prevDatas,
            id: getData.id,
            parentId: getData.parentId,
        }));

        const fieldsToCheck = [
            "description",
            "nameKeys",
            "fileNameAndroid",
            "fileNameIOS",
            "fileNameWeb",
            "english",
            "russian",
        ];
        const areFieldsEmpty = fieldsToCheck.every(
            (field) => !datas[field as keyof typeof datas],
        );

        if (areFieldsEmpty) {
            setDatas((prevDatas) => ({
                ...prevDatas,
                description: getData.description,
                nameKeys: getData.nameKeys,
                fileNameAndroid: getData.fileNameAndroid,
                fileNameIOS: getData.fileNameIOS,
                fileNameWeb: getData.fileNameWeb,
                english: getData.english,
                russian: getData.russian,
            }));
        }
    }, [checked, path, getData, datas]);

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        backend.updateTranslation(children, datas).then((data) => {
            if (data) {
                console.log("Success");
            }
        });
        setTimeout(() => {
            router.push(`/projects/${path}`);
        }, 1000);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <div>Проекты</div> / <div>{}</div> /{" "}
                    <div>Изменить ключ</div>
                </div>
                <h1 className={style.title}>Изменить ключ</h1>
                <form className={style.form}>
                    <label htmlFor="name">Название ключа</label>
                    <input
                        className={style.input}
                        defaultValue={getData.nameKeys}
                        onChange={(e) =>
                            setDatas({ ...datas, nameKeys: e.target.value })
                        }
                        type="text"
                        id="name"
                        name="name"
                    />
                    <label htmlFor="name">Описание</label>
                    <input
                        className={style.input}
                        defaultValue={getData.description}
                        onChange={(e) =>
                            setDatas({ ...datas, description: e.target.value })
                        }
                        type="text"
                        id="name"
                        name="name"
                    />

                    <Select
                        label="Теги"
                        labelPlacement="outside"
                        placeholder="Выберите язык"
                        className="w-full"
                        variant="bordered"
                        // selectedKeys={datas.tags.map((tag: any) => tag)}
                        selectionMode="multiple"
                        onSelectionChange={(e) => {
                            if (e.anchorKey) {
                                const tagIds = e.anchorKey
                                    .split(",")
                                    .map(Number)
                                    .filter(Boolean);
                                setDatas({ ...datas, tags: tagIds });
                            }
                        }}
                        isRequired
                    >
                        {tags.map((tag: any) => (
                            <SelectItem key={tag.id} value={tag.id}>
                                {tag.text}
                            </SelectItem>
                        ))}
                    </Select>

                    <CheckboxGroups
                        setCheckbox={setChecked}
                        value={checked}
                        label={"Платформа"}
                        data={checkbox_data}
                    />

                    <div className={style.file_name}>
                        <div className={style.file_name_cover}>
                            <label htmlFor="file">Имя файла iOS</label>
                            <input
                                type="text"
                                id="ios_name"
                                defaultValue={getData.fileNameIOS}
                                onChange={(e) =>
                                    setDatas({
                                        ...datas,
                                        fileNameIOS: e.target.value,
                                    })
                                }
                                name="file"
                                disabled={
                                    checked.includes("ios") ? false : true
                                }
                            />
                        </div>

                        <div className={style.file_name_cover}>
                            <label htmlFor="file">Имя файла Android</label>
                            <input
                                type="text"
                                defaultValue={getData.fileNameAndroid}
                                id="android_name"
                                onChange={(e) =>
                                    setDatas({
                                        ...datas,
                                        fileNameAndroid: e.target.value,
                                    })
                                }
                                name="file"
                                disabled={
                                    checked.includes("android") ? false : true
                                }
                            />
                        </div>

                        <div className={style.file_name_cover}>
                            <label htmlFor="file">Имя файла Web</label>
                            <input
                                type="text"
                                id="web_name"
                                name="file"
                                defaultValue={getData.fileNameWeb}
                                onChange={(e) =>
                                    setDatas({
                                        ...datas,
                                        fileNameWeb: e.target.value,
                                    })
                                }
                                disabled={
                                    checked.includes("web") ? false : true
                                }
                            />
                        </div>
                    </div>
                    <div className={style.input_containers}>
                        <div className={style.container_title}>
                            <label htmlFor="text">Русский</label>
                        </div>
                        <div className={style.container_input}>
                            <input
                                defaultValue={getData.russian}
                                onChange={(e) =>
                                    setDatas({
                                        ...datas,
                                        russian: e.target.value,
                                    })
                                }
                                type="text"
                                placeholder="Введите текст"
                            />
                        </div>
                    </div>
                    {/* );
          })} */}
                    {/* <div className={style.input_containers}>
            <div className={style.container_title}>
              <label htmlFor="text">Русский</label>
            </div>
            <div className={style.container_input}>
              <input
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    details: [
                      {
                        ...datas.details[0],
                        russian: e.target.value,
                      },
                    ],
                  })
                }
                type="text"
                placeholder="Введите текст"
              />
            </div>
          </div> */}

                    {/* {getData?.details?.map((item) => {
            return ( */}
                    <div className={style.input_containers}>
                        <div className={style.container_title}>
                            <label htmlFor="text">Английский</label>
                        </div>
                        <div className={style.container_input}>
                            <input
                                defaultValue={getData.english}
                                onChange={(e) =>
                                    setDatas({
                                        ...datas,
                                        // details: [
                                        //   {
                                        //     ...datas.details[0],
                                        english: e.target.value,
                                        //   },
                                        // ],
                                    })
                                }
                                type="text"
                                placeholder="Введите текст"
                            />
                        </div>
                    </div>
                    {/* );
          })} */}
                    {/* <div className={style.input_containers}>
            <div className={style.container_title}>
              <label htmlFor="text">Английский</label>
            </div>
            <div className={style.container_input}>
              <input
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    details: [
                      {
                        ...datas.details[0],
                        english: e.target.value,
                      },
                    ],
                  })
                }
                type="text"
                placeholder="Введите текст"
              />
            </div>
          </div> */}

                    <div className="flex gap-2 my-6">
                        <Button
                            onClick={HandleSubmit}
                            color="primary"
                            type="submit"
                        >
                            Изменить
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
