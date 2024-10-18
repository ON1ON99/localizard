"use client";
import backend from "@/shared/backend";
import style from "../index.module.css";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddUser = () => {
  const router = useRouter();
  const [datas, setDatas] = useState({
    username: "",
    password: "",
    role: "",
  });
  const roles = [
    { key: "admin", label: "Администратор" },
    { key: "user", label: "Пользователь" },
  ];
  const HandleSubmit = (e: any) => {
    e.preventDefault();
    backend
      .register(datas.username, datas.password, datas.role)
      .then((data) => {
        if (data) {
          router.push("/admin/dashboard");
        }
      });
  };
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <form className={style.form} aria-required>
          <label className={style.label} htmlFor="name">
            Название
          </label>
          <input
            required
            onChange={(e) => setDatas({ ...datas, username: e.target.value })}
            className={style.input}
            type="text"
            id="name"
            name="name"
          />
          <label className={style.label} htmlFor="password">
            Пароль
          </label>
          <input
            required
            onChange={(e) => setDatas({ ...datas, password: e.target.value })}
            className={style.input}
            type="password"
            id="password"
            name="password"
          />
          <Select
            label="Роль"
            labelPlacement="outside"
            onChange={(e) => setDatas({ ...datas, role: e.target.value })}
            placeholder="Выберите роль"
            className="w-full"
            isRequired
          >
            {roles.map((role) => (
              <SelectItem key={role.key}>{role.label}</SelectItem>
            ))}
          </Select>
          <div className=" flex gap-2">
            <Button
              color="primary"
              isDisabled={
                !datas?.role || !datas?.password || !datas?.username
                  ? true
                  : false
              }
              onClick={HandleSubmit}
              type="submit"
            >
              Создать проект
            </Button>
            <Button variant="ghost" type="reset">
              Отменить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
