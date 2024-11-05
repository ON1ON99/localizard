"use client";

import React, { useEffect, useCallback } from "react";
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
import edit from "@/assests/menu.svg";
import backend from "@/shared/backend";

export default function KeysTable({ rows, isLoading, setIsLoading }: any) {
    const router = useRouter();

    useEffect(() => {
        if (rows.length === 0) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [rows, setIsLoading]);

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
                                    <span
                                        key={translation.key}
                                        className="text-gray-500 text-sm"
                                    >
                                        {translation.language}
                                    </span>
                                    {translation.text}
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
                                                router.push(
                                                    `/projects/${item.parent}`,
                                                );
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
        [router, setIsLoading],
    );

    return (
        <Table aria-label="Example table with client async pagination">
            <TableHeader>
                <TableColumn key="projectName">Название</TableColumn>
                <TableColumn key="translation">Переводы</TableColumn>
                <TableColumn key="actions"> </TableColumn>
            </TableHeader>
            <TableBody
                items={rows ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState}
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
