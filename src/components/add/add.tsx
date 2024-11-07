"use client";
import { Button } from "@nextui-org/react";
import style from "./index.module.css";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";

const Add = ({ name, keys }: any) => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <div className={style.wrapper}>
            <h1>{name}</h1>
            <Button
                onClick={() => router.push(`/${keys}/add`)}
                color="primary"
                variant="ghost"
            >
                {t('Add')}
            </Button>
        </div>
    );
};

export default Add;
