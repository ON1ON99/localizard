"use client";

import KeysTable from "@/components/keysTable";
import backend from "@/shared/backend";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import search_icon from "@/assests/search.svg";
import Image from "next/image";

interface ProjectData {
    name?: string;
}

const Keys = () => {
    const router = useRouter();
    const [projectData, setProjectData] = useState<ProjectData>({});
    const [data, setData] = useState([]);
    const [id, setId] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const pathId = window.location.pathname.split("/")[2];
        setId(pathId);
    }, []);

    const columns = [
        {
            label: "Название",
            key: "nameKeys",
        },
        {
            label: "Переводы",
            key: "details",
        },
        {
            label: " ",
            key: "actions",
        },
    ];
    useEffect(() => {
        if (id) {
            backend.project(id).then((data) => {
                setProjectData(data);
            });
            backend.getTranslations(id, search).then((data) => {
                setData(data);
            });
        }
    }, [id, search]);
    return (
        <div className=" flex flex-col m-8">
            <div className=" flex gap-1 flex-col">
                <div className="flex gap-1">
                    <div onClick={() => router.push("/projects")}>Проекты</div>{" "}
                    / <div>{projectData.name ? projectData.name : "Ключ"}</div>
                </div>
                <div className="flex justify-between w-full border-b py-6">
                    <p className=" font-bold text-3xl">{projectData.name}</p>
                    <Button
                        color="primary"
                        variant="ghost"
                        onClick={() => router.push(`/projects/${id}/addKey`)}
                    >
                        Добавить ключ
                    </Button>
                    {/* <button
            className="btn btn-primary"
            onClick={() => router.push(`/projects/${id}/addKey`)}
          >
            Добавить ключ
          </button> */}
                </div>
            </div>
            <div className="w-full flex flex-col gap-6">
                <Input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск по имени ключа и переводу"
                    startContent={
                        <Image
                            src={search_icon}
                            width={20}
                            height={20}
                            alt="search icon"
                        />
                    }
                    className="w-full"
                />
                <KeysTable rows={data ?? []} columns={columns} />
            </div>
        </div>
    );
};

export default Keys;
