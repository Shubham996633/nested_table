"use client";

import { Separator } from "@/components/ui/separator";

import { DataTable } from "@/components/ui/data-table";
import { ChaptersColumn, columns } from "./columns";

interface ChaptersClientProps {
	data: ChaptersColumn[];
	purchaseId: string
}

export const ChaptersClient: React.FC<ChaptersClientProps> = ({ data }) => {


	return (
		<>

			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-bold tracking-tight">Chapters</h2>
					<p className="text-xs text-muted-foreground mb-3">Chapters under the seletced book</p>
				</div>

			</div>
			<Separator />

			<DataTable columns={columns} data={data} />
			<Separator />
		</>
	);
};
