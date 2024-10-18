"use client";
import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "../index.module.css";
import { useEffect, useState } from "react";
import backend from "@/shared/backend";

const AddLanguage = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [datas, setDatas] = useState<{
    name: string;
    languageCode: string;
    pluralForms: string[];
  }>({
    name: "",
    languageCode: "",
    pluralForms: [],
  });

  const languages = [
    { key: "russian", label: "Russian" },
    { key: "english", label: "English" },
    { key: "uzbek", label: "Uzbek" },
    { key: "deutsch", label: "German" },
    { key: "kazak", label: "Kazak" },
    { key: "french", label: "French" },
    { key: "spanish", label: "Spanish" },
    { key: "japanese", label: "Japanese" },
    { key: "ukrainian", label: "Ukrainian" },
    { key: "arabic", label: "Arabic" },
  ];

  const checkbox_data = [
    { key: "zero", label: "Zero" },
    { key: "one", label: "One" },
    { key: "two", label: "Two" },
    { key: "few", label: "Few" },
    { key: "many", label: "Many" },
    { key: "other", label: "Other" },
  ];
  useEffect(() => {
    setDatas({ ...datas, pluralForms: checked });
  }, [checked]);

  const HandleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Data before POST:", datas); // Log the data being sent

    backend.addLanguage(datas).then((data) => {
      
      if (data) {
        console.log("Success");
      }
    });
  };
  console.log("Checked", checked);
  

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.path}>
          <div>Языки</div> / <div>Добавить язык</div>
        </div>
        <h1 className={style.title}>Добавить язык</h1>
        <form className={style.form}>
          {/* <label htmlFor="language">Язык</label> */}
          <Select
            label="Язык"
            labelPlacement="outside"
            placeholder="Выберите язык"
            className="w-full"
            variant="bordered"
            onChange={(e) =>
              setDatas({ ...datas, name: e.target.value })
            }
            isRequired
          >
            {languages.map((language) => (
              <SelectItem key={language.key} value={language.key}>
                {language.label}
              </SelectItem>
            ))}
          </Select>

          <label htmlFor="name">Код языка</label>
          <input
            className={style.input}
            onChange={(e) => setDatas({ ...datas, languageCode: e.target.value })}
            type="text"
            id="name"
            name="name"
          />

          <CheckboxGroups
            setCheckbox={setChecked}
            labelPlacement="outside"
            label={"Множественное число"}
            data={checkbox_data}
          />

          <div className="flex gap-2">
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

export default AddLanguage;