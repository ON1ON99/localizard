"use client";
import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "./index.module.css";
import { useEffect, useState } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";

const AddKey = () => {
  const router = useRouter();
  const path = window.location.pathname.split("/")[2];
  const [checked, setChecked] = useState<string[]>([]);
  const [tags, setTags] = useState<number[]>([]);
  const [datas, setDatas] = useState<{
    nameKeys: string;
    parentId: number;
    description: string;
    tags: number[];
    fileNameIOS: string;
    fileNameAndroid: string;
    fileNameWeb: string;
    russian: string;
    english: string;
    // details: [
    //   {
    //     russian: string;
    //     english: string;
    //   }
    // ];
  }>({
    nameKeys: "",
    tags: [],
    description: "",
    fileNameIOS: "",
    fileNameAndroid: "",
    fileNameWeb: "",
    russian: "",
    english: "",
    parentId: 0,
    // details: [
    //   {
    //     russian: "",
    //     english: "",
    //   },
    // ],
  });

  useEffect(() => {
    backend.tags().then((data) => {
      setTags(data);
    });
  }, []);
  // const languages = [
  //   { key: "russian", label: "Russian" },
  //   { key: "english", label: "English" },
  //   { key: "uzbek", label: "Uzbek" },
  //   { key: "deutsch", label: "German" },
  //   { key: "kazak", label: "Kazak" },
  //   { key: "french", label: "French" },
  //   { key: "spanish", label: "Spanish" },
  //   { key: "japanese", label: "Japanese" },
  //   { key: "ukrainian", label: "Ukrainian" },
  //   { key: "arabic", label: "Arabic" },
  // ];

  const checkbox_data = [
    { key: "ios", label: "iOS" },
    { key: "android", label: "Android" },
    { key: "web", label: "Web" },
  ];
  useEffect(() => {
    setDatas((prevDatas) => ({
      ...prevDatas,
      parentId: parseInt(path),
    }));
  }, [checked, path]);

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    backend.addTranslation(datas).then((data) => {
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
          <div>Проекты</div> / <div>{}</div> / <div>Добавить ключ</div>
        </div>
        <h1 className={style.title}>Добавить язык</h1>
        <form className={style.form}>
          <label htmlFor="name">Название ключа</label>
          <input
            className={style.input}
            onChange={(e) => setDatas({ ...datas, nameKeys: e.target.value })}
            type="text"
            id="name"
            name="name"
          />
          <label htmlFor="name">Описание</label>
          <input
            className={style.input}
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
            placeholder="Выберите теги"
            className="w-full"
            variant="bordered"
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
            label={"Платформа"}
            data={checkbox_data}
          />

          <div className={style.file_name}>
            <div className={style.file_name_cover}>
              <label htmlFor="file">Имя файла iOS</label>
              <input
                type="text"
                id="ios_name"
                onChange={(e) =>
                  setDatas({ ...datas, fileNameIOS: e.target.value })
                }
                name="file"
                disabled={checked.includes("ios") ? false : true}
              />
            </div>

            <div className={style.file_name_cover}>
              <label htmlFor="file">Имя файла Android</label>
              <input
                type="text"
                id="android_name"
                onChange={(e) =>
                  setDatas({ ...datas, fileNameAndroid: e.target.value })
                }
                name="file"
                disabled={checked.includes("android") ? false : true}
              />
            </div>

            <div className={style.file_name_cover}>
              <label htmlFor="file">Имя файла Web</label>
              <input
                type="text"
                id="web_name"
                name="file"
                onChange={(e) =>
                  setDatas({ ...datas, fileNameWeb: e.target.value })
                }
                disabled={checked.includes("web") ? false : true}
              />
            </div>
          </div>
          <div className={style.input_containers}>
            <div className={style.container_title}>
              <label htmlFor="text">Русский</label>
            </div>
            <div className={style.container_input}>
              <input
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    // details: [
                    //   {
                    //     ...datas.details[0],
                    //     russian: e.target.value,
                    //   },
                    // ],
                    russian: e.target.value,
                  })
                }
                type="text"
                placeholder="Введите текст"
              />
            </div>
          </div>
          <div className={style.input_containers}>
            <div className={style.container_title}>
              <label htmlFor="text">Английский</label>
            </div>
            <div className={style.container_input}>
              <input
                onChange={(e) =>
                  setDatas({
                    ...datas,
                    // details: [
                    //   {
                    //     ...datas.details[0],
                    //     english: e.target.value,
                    //   },
                    // ],
                    english: e.target.value,
                  })
                }
                type="text"
                placeholder="Введите текст"
              />
            </div>
          </div>

          <div className="flex gap-2 my-6">
            <Button onClick={HandleSubmit} color="primary" type="submit">
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
