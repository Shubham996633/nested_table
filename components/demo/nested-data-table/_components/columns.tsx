"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Book } from "@/types/books.types";
import { ArrowUpDown } from "lucide-react";
import { CellAction } from "./cell-action";

export type BooksColumn = Book;

export const columns: ColumnDef<BooksColumn>[] = [
    {
        accessorKey: "book_id",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Book ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },

    },
    {
        accessorKey: "author",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Author
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },

    },
    {
        accessorKey: "yearPublished",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Year Published
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },

    },
    {
        accessorKey: "genre",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Genre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },

    },

    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
