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
import edit from "@/assets/menu.svg";
import backend from "@/shared/backend";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface KeysTableProps {
    rows: any[];
    columns: { key: string; label: string }[];
}

export default function KeysTable({ rows: initialRows, columns }: KeysTableProps) {
    const [rows, setRows] = useState(initialRows);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Load data or handle initial state here
        if (rows.length > 0) setIsLoading(false);
    }, [rows]);

    const loadingState = isLoading || rows.length === 0 ? "loading" : "idle";

    const handleDelete = async (item: any) => {
        setIsLoading(true);
        try {
            await backend.deleteTranslation(item.id);
            const updatedRows = await backend.getTranslations(item.parentId, "");
            setRows(updatedRows);
        } catch (error) {
            console.error("Error deleting translation:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderCell = (item: any, columnKey: string) => {
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
                    <div className="flex flex-col gap-2 text-xl">
                        <div className="border-b-1 p-1 flex flex-col">
                            <span className="text-gray-500 text-sm">Русский</span>
                            {item.russian}
                        </div>
                        <div className="border-b-1 p-1 flex flex-col">
                            <span className="text-gray-500 text-sm">English</span>
                            {item.english}
                        </div>
                    </div>
                );
            case "actions":
                return (
                    <div className="flex justify-end items-center">
                        <Dropdown>
                            <DropdownTrigger>
                                <Image src={edit} alt="edit" width={20} height={20} />
                            </DropdownTrigger>
                            <DropdownMenu variant="flat">
                                <DropdownItem
                                    key="edit"
                                    onClick={() =>
                                        router.push(`/projects/${item.parentId}/editKey/${item.id}`)
                                    }
                                >
                                    Изменить
                                </DropdownItem>
                                <DropdownItem
                                    color="danger"
                                    key="delete"
                                    onClick={() => handleDelete(item)}
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
        <Table aria-label="Keys Table" isStriped className="border-collapse">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody
                loadingContent={<Spinner />}
                loadingState={loadingState}
                emptyContent="No rows to display."
                items={rows}
            >
                {(item) => (
                    <TableRow key={String(item.id)}>
                        {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
