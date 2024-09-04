"use client";

import { Copy, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChaptersColumn } from "./columns";

interface CellActionProps {
	data: ChaptersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success("Chapter ID copied to clipboard.");
	};




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
						<DropdownMenuItem onClick={() => onCopy(data.chapter_id)}>
							<Copy className="mr-2 h-4 w-4" /> Copy Id
						</DropdownMenuItem>

					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	);
};
