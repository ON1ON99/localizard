import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import edit from "@/assests/menu.svg";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KeysTable({
    rows,
    columns,
}: {
    rows: any[];
    columns: any[];
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    const loadingState = isLoading || rows.length === 0 ? "loading" : "idle";
    const router = useRouter();
    const rengerCell = (item: any, columnKey: any) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "nameKeys":
                return (
                    <div className="flex items-center gap-2">
                        <span>{cellValue}</span>
                    </div>
                );
            case "details":
                return (
                    // item.details.map((detail: any) => (
                    <div className="flex flex-col gap-2 text-xl">
                        <div className="border-b-1 p-1 flex flex-col">
                            <span className="text-gray-500 text-sm">
                                Русский
                            </span>
                            {item.russian}
                        </div>
                        <div className="border-b-1 p-1 flex flex-col">
                            <span className="text-gray-500 text-sm">
                                English
                            </span>
                            {item.english}
                        </div>
                    </div>
                    // ))
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
                                            .then(
                                                ()=>{
                                                    setIsLoading(true)
                                                    backend.getTranslations(item.parentId, "").then((data) => {
                                                        setIsLoading(false)
                                                        rows = data
                                                    })
                                                }
                                            )
                                    }
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
    };

    return (
        <Table aria-label="" isStriped className=" border-collapse">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody
                loadingContent={<Spinner />}
                loadingState={loadingState}
                emptyContent={"No rows to display."}
                items={rows}
            >
                {(item) => (
                    <TableRow key={String(item.id)}>
                        {(columnKey) => (
                            <TableCell>{rengerCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
