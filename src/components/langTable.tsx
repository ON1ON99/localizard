"use client";

import React, { useEffect, useState } from "react";
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

export default function LangTable() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const colors = [
        {
            key: "zero",
            background: "#0086C914;",
            border: "1px solid #0086C93D",
            text: "#0086C9;",
        },
        {
            key: "one",
            background: "#6938EF14;",
            border: "1px solid #6938EF3D",
            text: "#6938EF;",
        },
        {
            key: "two",
            background: "#E31B5414;",
            border: "1px solid #E31B543D",
            text: "#E31B54;",
        },
        {
            key: "few",
            background: "#0E938414;",
            border: "1px solid #0E93843D",
            text: "#0E9384;",
        },
        {
            key: "many",
            background: "#FF440514;",
            border: "1px solid #FF44053D",
            text: "#FF4405;",
        },
        {
            key: "other",
            background: "#0010240A;",
            border: "1px solid var(--separator-normal, #75808A29)",
            text: "#001024;",
        },
    ];
    useEffect(() => {
        setIsLoading(true); // Start loading
        backend
            .languages()
            .then((responseData) => {
                setData(responseData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setIsLoading(false); // Stop loading
            });
    }, []);
    // const { data, isLoading } = useSWR(
    //   `https://0t18bjmv-7118.euw.devtunnels.ms/api/Language`,
    //   fetcher,
    //   {
    //     keepPreviousData: true,
    //   }
    // );

    const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";
    const renderCell = React.useCallback(
        (user: any, columnKey: any) => {
            const cellValue = user[columnKey];

            switch (columnKey) {
                case "name":
                    return cellValue;
                case "pluralForms":
                    return (
                        <div className="flex gap-2">
                            {user.pluralForms.map((item: any) => (
                                <div
                                    style={{
                                        border: colors.find(
                                            (color) => color.key === item,
                                        )?.border,
                                        background: colors.find(
                                            (color) => color.key === item,
                                        )?.background,
                                        color: colors.find(
                                            (color) => color.key === item,
                                        )?.text,
                                        textTransform: "capitalize",
                                        padding: "0 8px",
                                        borderRadius: "16px",
                                    }}
                                    key={item}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    );
                case "actions":
                    return (
                        <div className="flex justify-end items-center">
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
                                                `languages/edit/${user.id}`,
                                            )
                                        } // Directly use user.id here
                                    >
                                        Изменить
                                    </DropdownItem>
                                    <DropdownItem
                                        color="danger"
                                        key="delete"
                                        onClick={() => (
                                            backend.deleteLanguage(user.id),
                                            router.refresh()
                                        )} // Directly use user.id here
                                    >
                                        Удалить
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [router, colors],
    ); // Added router to dependencies

    return (
        <Table aria-label="Example table with client async pagination">
            <TableHeader>
                <TableColumn key="name">Язык</TableColumn>
                <TableColumn key="pluralForms">Множественное число</TableColumn>
                <TableColumn key="languageCode">Код языка</TableColumn>
                <TableColumn key="actions"> </TableColumn>
            </TableHeader>
            <TableBody
                items={data ?? []}
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
