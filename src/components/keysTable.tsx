"use client";

import React, { useEffect, useCallback, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Spinner,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import edit from "../assests/menu.svg";
import backend from "@/shared/backend";

export default function KeysTable({ id, search }: any) {
    const pathId = window.location.pathname.split("/")[2];
    const router = useRouter();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        backend.getTranslations(pathId, search).then((data) => {
            setData(data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [id, search]);

    const loadingState = isLoading ? "loading" : "idle";

    const renderCell = useCallback(
        (item: any, columnKey: any) => {
            const cellValue = item[columnKey];

            switch (columnKey) {
                case "projectName":
                    return (
                        <div className="flex items-center gap-2 cursor-pointer">
                            <Tooltip
                                showArrow
                                placement="bottom"
                                content={item.productDesc}
                                classNames={{
                                    base: [
                                        "before:bg-neutral-400 dark:before:bg-white",
                                    ],
                                    content: [
                                        "py-2 px-4 shadow-xl",
                                        "text-black bg-gradient-to-br from-white to-neutral-400",
                                    ],
                                }}
                            >
                                <span>{item.projectName}</span>
                            </Tooltip>
                        </div>
                    );
                case "translation":
                    return (
                        <div className="flex flex-col gap-2 text-xl">
                            {item.translation.map((translation: any) => (
                                <div
                                    key={translation.key}
                                    className="border-b-1 p-1 flex flex-col"
                                >
                                    <span className="text-gray-500 text-sm">
                                        {translation.language}
                                    </span>
                                    {
                                    translation.text.slice(0, 50) + (translation.text.length > 50 ? "..." : "")
                                    }
                                </div>
                            ))}
                        </div>
                    );
                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Image
                                    className="left-full"
                                    src={edit}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                            </DropdownTrigger>
                            <DropdownMenu variant="flat">
                                <DropdownItem
                                    key="edit"
                                    onClick={() =>
                                        router.push(
                                            `/projects/${item.parent}/editKey/${item.projectID}`,
                                        )
                                    }
                                >
                                    Изменить
                                </DropdownItem>
                                <DropdownItem
                                    color="danger"
                                    key="delete"
                                    onClick={() =>
                                        backend
                                            .deleteTranslation(item.projectID)
                                            .then(() => {
                                                setIsLoading(true);
                                                backend.getTranslations(pathId, search).then((data) => {
                                                    setData(data);
                                                }
                                                ).catch((error) => {
                                                    console.error("Error fetching data:", error);
                                                }
                                                ).finally(() => {
                                                    setIsLoading(false);
                                                });

                                            })
                                    }
                                >
                                    Удалить
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    );
                default:
                    return cellValue;
            }
        },
        [router],
    );

    return (
        <Table aria-label="Example table with client async pagination">
            <TableHeader>
                <TableColumn key="projectName">Название</TableColumn>
                <TableColumn key="translation">Переводы</TableColumn>
                <TableColumn key="actions"> </TableColumn>
            </TableHeader>
            <TableBody
                loadingState={loadingState}
                loadingContent={<Spinner />}
                items={data ?? []}
                emptyContent={"No rows to display."}
            >
                {(item: any) => (
                    <TableRow key={item?.projectID} className="border-b-1">
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
