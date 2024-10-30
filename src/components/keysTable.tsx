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
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import edit from "@/assests/menu.svg";
import backend from "@/shared/backend";

export default function KeysTable({ rows, isLoading, setIsLoading }: any) {
    const router = useRouter();

    useEffect(() => {
        rows.length === 0 ? setIsLoading(true) : setIsLoading(false);
    }, [rows, setIsLoading]);

    const loadingState = isLoading || rows.length === 0 ? "loading" : "idle";

    const renderCell = useCallback(
        (item: any, columnKey: any) => {
            const cellValue = item[columnKey];

            switch (columnKey) {
                case "namekeys":
                    return (
                        <div className="flex items-center gap-2 cursor-pointer">
                            <span>{cellValue}</span>
                        </div>
                    );
                case "translations":
                    return (
                        <div className="flex flex-col gap-2 text-xl">
                            {item.translations.map((translation: any) => (
                                <div key={translation.key} className="border-b-1 p-1 flex flex-col">
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
                                            `/projects/${item.parentId}/editKey/${item.id}`,
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
                                            .deleteTranslation(item.id)
                                            .then(() => {
                                                setIsLoading(true);
                                                router.push(
                                                    `/projects/${item.parentId}`,
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
                <TableColumn key="namekeys">Название</TableColumn>
                <TableColumn key="translations">Переводы</TableColumn>
                <TableColumn key="actions"> </TableColumn>
            </TableHeader>
            <TableBody
                items={rows ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState}
                emptyContent={"No rows to display."}
            >
                {(item: any) => (
                    <TableRow key={item?.id}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
