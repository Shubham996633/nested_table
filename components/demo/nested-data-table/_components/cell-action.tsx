"use client";

import { Copy, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BooksColumn } from "./columns";

interface CellActionProps {
    data: BooksColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Book ID copied to clipboard.");
    };
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleOpen = (id: string) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [openDelete, setDeleteOpen] = useState(false);

    const [loading, setLoading] = useState(false);


    return (
        <>

            <div className="flex flex-row ml-5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onCopy(data.book_id)}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Id
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};
