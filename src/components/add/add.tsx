"use client";
import { Button } from "@nextui-org/react";
import style from "./index.module.css";
import { useRouter } from "next/navigation";

const Add = ({ name, keys }: any) => {
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <h1>{name}</h1>
      <Button
        onClick={() => router.push(`/${keys}/add`)}
        color="primary"
        variant="ghost"
      >
        Добавить
      </Button>
    </div>
  );
};

export default Add;
