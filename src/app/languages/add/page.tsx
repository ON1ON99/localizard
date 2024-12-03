"use client";
import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "../index.module.css";
import { useEffect, useState } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";
import { languages } from "@/shared/mock_data";

const AddLanguage = () => {
    const [checked, setChecked] = useState<string[]>([]);
    const [datas, setDatas] = useState<{
        name: string;
        languageCode: string;
        Plurals: string[];
    }>({
        name: "",
        languageCode: "",
        Plurals: [],
    });

    const checkboxData = [
        { key: "zero", label: "Zero" },
        { key: "one", label: "One" },
        { key: "two", label: "Two" },
        { key: "few", label: "Few" },
        { key: "many", label: "Many" },
        { key: "other", label: "Other" },
    ];

    useEffect(() => {
        setDatas((prevDatas) => ({ ...prevDatas, Plurals: checked }));
    }, [checked]);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data before POST:", datas);

        const data = await backend.addLanguage(datas);
        if (data) {
            router.push("/languages");
        }
        console.log("Data:", datas);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <div>Языки</div> / <div>Добавить язык</div>
                </div>
                <h1 className={style.title}>Добавить язык</h1>
                <form className={style.form} onSubmit={handleSubmit}>
                    <Select
                        label="Язык"
                        labelPlacement="outside"
                        placeholder="Выберите язык"
                        className="w-full"
                        variant="bordered"
                        onChange={(e) =>
                            setDatas((prevDatas) => ({
                                ...prevDatas,
                                name: e.target.value,
                            }))
                        }
                        isRequired
                    >
                        {languages.map((language) => (
                            <SelectItem key={language.value} value={language.value}>
                                {language.value}
                            </SelectItem>
                        ))}
                    </Select>

                    <label htmlFor="languageCode">Код языка</label>
                    <input
                        className={style.input}
                        onChange={(e) =>
                            setDatas((prevDatas) => ({
                                ...prevDatas,
                                languageCode: e.target.value,
                            }))
                        }
                        type="text"
                        id="languageCode"
                        name="languageCode"
                    />

                    <CheckboxGroups
                        setCheckbox={setChecked}
                        labelPlacement="outside"
                        label={"Множественное число"}
                        data={checkboxData}
                    />

                    <div className="flex gap-2">
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

export default AddLanguage;
