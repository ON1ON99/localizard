"use client";
import CheckboxGroups from "@/components/checkboxGroup";
import { Button, Select, SelectItem } from "@nextui-org/react";
import style from "../../index.module.css";
import { useEffect, useState } from "react";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";
import { languages } from "@/shared/mock_data";

const EditLanguage = () => {
    const [checked, setChecked] = useState<string[]>([]);
    const path = location.pathname.split("/")[3];
    const router = useRouter();
    const [getData, setGetData] = useState<{
        id: number;
        name: string;
        languageCode: string;
        plurals: string[];
    }>({
        id: 0,
        name: "",
        languageCode: "",
        plurals: [],
    });

    useEffect(() => {
        if (path){
            backend.language(path).then((data) => {
                setGetData(data);
            });
        }
    }, [path]);

    const [datas, setDatas] = useState<{
        id: number;
        name: string;
        languageCode: string;
        plurals: string[];
    }>({
        id: 0,
        name: "",
        languageCode: "",
        plurals: [],
    });

    const checkbox_data = [
        { key: "zero", label: "Zero" },
        { key: "one", label: "One" },
        { key: "two", label: "Two" },
        { key: "few", label: "Few" },
        { key: "many", label: "Many" },
        { key: "other", label: "Other" },
    ];
    useEffect(() => {
        setDatas({ ...datas, plurals: checked, id: getData.id });
    }, [checked, getData.id]);

    useEffect(() => {
        if (datas.plurals.length === 0) {
            setChecked(getData.plurals);
        }

        if (datas.name === "") {
            setDatas({ ...datas, name: getData.name });
        }

        if (datas.languageCode === "") {
            setDatas({ ...datas, languageCode: getData.languageCode });
        }
    }, [getData]);

    const HandleSubmit = (e: any) => {
        e.preventDefault();

        backend.updateLanguage(path, datas).then((data) => {
            if (data) {
                console.log("Success");
                setTimeout(() => {
                    router.push("/languages");
                }, 1000);
            }
        });

        router.push("/languages");
    };

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.path}>
                    <div>Языки</div> / <div>Изменить язык</div>
                </div>
                <h1 className={style.title}>Изменить язык</h1>
                <form className={style.form}>
                <Select
                        label="Язык"
                        labelPlacement="outside"
                        placeholder="Выберите язык"
                        className="w-full"
                        variant="bordered"
                        onSelectionChange={(value: any) =>
                            setDatas((prevDatas) => ({
                                ...prevDatas,
                                name:
                                    languages.find(
                                        (lang) => lang.value === value.currentKey,
                                    )?.value || "",
                            }))
                        }
                        isRequired
                    >
                        {languages.map((language) => (
                            <SelectItem key={language.value}>
                                {language.value}
                            </SelectItem>
                        ))}
                    </Select>

                    <label htmlFor="name">Код языка</label>
                    <input
                        className={style.input}
                        defaultValue={getData.languageCode}
                        onChange={(e) =>
                            setDatas({ ...datas, languageCode: e.target.value })
                        }
                        type="text"
                        id="name"
                        name="name"
                    />

                    <CheckboxGroups
                        setCheckbox={setChecked}
                        defaultValue={getData.plurals}
                        label={"Множественное число"}
                        labelPlacement="outside"
                        isRequired
                        data={checkbox_data}
                    />

                    <div className="flex gap-2">
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

export default EditLanguage;
