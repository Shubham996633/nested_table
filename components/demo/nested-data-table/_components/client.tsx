"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { DataTable } from "./Data-Table/data-table";
import { BooksColumn, columns } from "./columns";

interface BooksClientProps {
    data: BooksColumn[];
}

export const BooksClient: React.FC<BooksClientProps> = ({ data }) => {



    return (
        <>

            <div className="flex items-center justify-between">
                <Heading title={`Books (${data.length})`} description="Manage Books " />

            </div>
            <Separator />
            <DataTable
                columns={columns}
                data={data}
                getRowCanExpand={() => true}
            />
            <Separator />
        </>
    );
};
