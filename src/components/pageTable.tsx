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
// import { languages } from "@/shared/mock_data";

export default function Tables() {
    const [languages, setLanguages] = useState([
        {
            id: 0,
            name: "",
        },
    ]);
    const [page, setPage] = useState(1);
    interface ProjectData {
        totalCount: number;
        projects: any[];
        pageNumber?: number;
        total?: number;
        pageSize?: number;
    }
    
    const [data, setData] = useState<ProjectData>({
        totalCount: 0,
        projects: [],
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
        backend.languages().then((data) => {
            setLanguages(data);
        }
        );
    }, [page]);

    const rowsPerPage = 10;

    const pages = useMemo(() => {
        return data?.totalCount
            ? Math.ceil(data.totalCount / rowsPerPage)
            : 0;
    }, [data?.totalCount, rowsPerPage]);

    const loadingState =
        isLoading || data?.projects?.length === 0 ? "loading" : "idle";

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
                case "defaultLanguageId":
                    return (
                        <div>
                            {languages.find((l: any) => l.id === cellValue)
                                ?.name ?? cellValue}
                        </div>
                        // <div>
                        //     {cellValue?.name}
                        // </div>
                    );
                case "availableLanguageIds":
                    return (
                        <div className="flex gap-1 w-full">
                            {cellValue?.slice(0, 3).map((lang: any) => (
                                <span
                                    key={lang}
                                    className="text-xs font-medium py-0.5 px-2 rounded-3xl border bg-gray-800 bg-opacity-5"
                                >
                                    {languages.find((l: any) => l.id === lang)
                                        ?.name ?? lang}
                                </span>
                            ))}
                            {/* {
                                cellValue?.map((lang: any) => (
                                    <span
                                        key={lang.id}
                                        className="text-xs font-medium py-0.5 px-2 rounded-3xl border bg-gray-800 bg-opacity-5"
                                    >
                                        {lang.name}
                                    </span>
                                ))
                            } */}
                            {cellValue?.length > 3 && (
                                <span className="text-xs font-medium py-0.5 px-2 rounded-3xl border bg-gray-800 bg-opacity-5">
                                    +{cellValue.length - 3}
                                </span>
                            )}
                        </div>
                    );

                case "createdAt":
                case "updatedAt":
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
                                            .then(() => {
                                                setIsLoading(true);
                                                backend
                                                    .projects(page)
                                                    .then((responseData) => {
                                                        setData(responseData);
                                                    })
                                                    .catch((error) => {
                                                        console.error(
                                                            "Error fetching data:",
                                                            error,
                                                        );
                                                    })
                                                    .finally(() => {
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
                <TableColumn key="defaultLanguageId">
                    Язык по умолчанию
                </TableColumn>
                <TableColumn key="availableLanguageIds">
                    Доступные языки
                </TableColumn>
                <TableColumn key="createdAt">Дата добавления</TableColumn>
                <TableColumn key="updatedAt">Последнее обновление</TableColumn>
                <TableColumn key="actions"> </TableColumn>
            </TableHeader>
            <TableBody
                items={data?.projects ?? []}
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
