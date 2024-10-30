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

export default function UsersList() {
    const [page, setPage] = useState(1);
    interface ProjectData {
        totalRecords: number;
        data: any[];
        pageNumber?: number;
        total?: number;
        pageSize?: number;
    }

    const [data, setData] = useState<ProjectData>({
        totalRecords: 0,
        data: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        backend
            .users(page)
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
                case "username":
                    return (
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <span className="font-semibold">
                                    {cellValue}
                                </span>
                            </div>
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
                                            `/admin/dashboard/${user.id}`,
                                        )
                                    }
                                >
                                    Изменить
                                </DropdownItem>
                                <DropdownItem
                                    color="danger"
                                    key="delete"
                                    onClick={() =>
                                        backend.deleteUser(user.id).then(() => {
                                            setIsLoading(true);
                                            backend
                                                .users(page)
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
        [router],
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
                <TableColumn key="username">Пользователь</TableColumn>
                <TableColumn key="role">Роль</TableColumn>
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
