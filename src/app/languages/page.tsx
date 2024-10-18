'use client';

import Add from "@/components/add/add";
import LangTable from "@/components/langTable";
import style from "./index.module.css";

const Languages = () => {

    return (
        <div className={style.wrapper}>
            <Add name="Языки" keys="languages"/>
            <LangTable />
        </div>
    );
}

export default Languages;
