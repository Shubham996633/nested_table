"use client"

import { BooksData } from "@/json/books"
import { BooksClient } from "./_components/client"

type Props = {}

const NestedDataTable = (props: Props) => {
    return (
        <div className="bg-gray-900 rounded-lg p-6 flex-col ">
            <div className="flex-1 ">


                <BooksClient data={BooksData} />
            </div>
        </div>
    )
}

export default NestedDataTable