"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
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

export default function Tables() {
    const [page, setPage] = useState(1);
    interface ProjectData {
        totalRecords: number;
        data: any[];
        pageNumber?: number;
        total?: number;
        pageSize?: number;
    }
    const languages = [
        {
            key: "ru",
            value: "Русский",
        },
        {
            key: "en",
            value: "Английский",
        },
        {
            key: "de",
            value: "Немецкий",
        },
        {
            key: "fr",
            value: "Французский",
        },
        {
            key: "es",
            value: "Испанский",
        },
        {
            key: "it",
            value: "Итальянский",
        },
        {
            key: "pt",
            value: "Португальский",
        },
        {
            key: "zh",
            value: "Китайский",
        },
        {
            key: "ja",
            value: "Японский",
        },
        {
            key: "ko",
            value: "Корейский",
        },
        {
            key: "ar",
            value: "Арабский",
        },
        {
            key: "tr",
            value: "Турецкий",
        },
        {
            key: "vi",
            value: "Вьетнамский",
        },
        {
            key: "th",
            value: "Тайский",
        },
        {
            key: "hi",
            value: "Хинди",
        },
        {
            key: "bn",
            value: "Бенгальский",
        },
        {
            key: "ur",
            value: "Урду",
        },
        {
            key: "fa",
            value: "Персидский",
        },
        {
            key: "he",
            value: "Иврит",
        },
        {
            key: "id",
            value: "Индонезийский",
        },
        {
            key: "ms",
            value: "Малайский",
        },
        {
            key: "fil",
            value: "Филиппинский",
        },
        {
            key: "sw",
            value: "Суахили",
        },
        {
            key: "yo",
            value: "Йоруба",
        },
        {
            key: "ha",
            value: "Хауса",
        },
        {
            key: "ig",
            value: "Игбо",
        },
        {
            key: "am",
            value: "Амхарский",
        },
        {
            key: "om",
            value: "Оромо",
        },
        {
            key: "ti",
            value: "Тигринья",
        },
        {
            key: "so",
            value: "Сомали",
        },
        {
            key: "st",
            value: "Сесото",
        },
    ];

    const [data, setData] = useState<ProjectData>({
        totalRecords: 0,
        data: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        backend
            .projects(page)
            .then((responseData) => {
                setData(responseData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    const rowsPerPage = 10;

    const pages = useMemo(() => {
        return data?.totalRecords
            ? Math.ceil(data.totalRecords / rowsPerPage)
            : 0;
    }, [data?.totalRecords, rowsPerPage]);

    const loadingState =
        isLoading || data?.data?.length === 0 ? "loading" : "idle";

    const renderCell = useCallback(
        (user: any, columnKey: any) => {
            const cellValue = user[columnKey];

            switch (columnKey) {
                case "name":
                    return (
                        <div
                            onClick={() => router.push(`projects/${user.id}`)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <span>{cellValue}</span>
                        </div>
                    );
                case "defaultLanguage":
                    return (
                        languages.find((lang) => lang.key === cellValue)
                            ?.value ?? cellValue
                    );
                case "availableLanguages":
                    return cellValue
                        .map(
                            (lang: string) =>
                                languages.find((l) => l.key === lang)?.value,
                        )
                        .join(", ");
                case "CreatedAt":
                case "UpdatedAt":
                    return new Date(cellValue).toLocaleString();
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
                                        router.push(`/projects/edit/${user.id}`)
                                    }
                                >
                                    Изменить
                                </DropdownItem>
                                <DropdownItem
                                    color="danger"
                                    key="delete"
                                    onClick={() =>
                                        backend
                                            .deleteProject(user.id)
                                            .then(() => router.push("/projects"))
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
        [router, languages],
    );

    return (
        <Table
            aria-label="Example table with client async pagination"
            bottomContent={
                pages > 0 ? (
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                ) : null
            }
        >
            <TableHeader>
                <TableColumn key="name">Название</TableColumn>
                <TableColumn key="defaultLAnguage">
                    Язык по умолчанию
                </TableColumn>
                <TableColumn key="availableLanguage">
                    Доступные языки
                </TableColumn>
                <TableColumn key="CreatedAt">Дата добавления</TableColumn>
                <TableColumn key="UpdatedAt">Последнее обновление</TableColumn>
                <TableColumn key="actions"> </TableColumn>
            </TableHeader>
            <TableBody
                items={data?.data ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState}
                emptyContent={"No rows to display."}
            >
                {(item: any) => (
                    <TableRow key={item?.name}>
                        {(columnKey) => (
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
