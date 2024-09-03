import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
	ColumnDef,
	ColumnFiltersState,
	Row,
	SortingState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
// import { PurchasesPlansClient } from "../plans/client";
// Define DataTableProps interface
interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	getRowCanExpand: (row: Row<TData>) => boolean;
}

// Define DataTable component
export function DataTable<TData, TValue>({
	columns,
	data,
	getRowCanExpand,
}: DataTableProps<TData, TValue>) {
	const [expanded, setExpanded] = React.useState({});

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getRowCanExpand,
		getExpandedRowModel: getExpandedRowModel(),
		state: {
			sorting,
			columnFilters,
			expanded,
		},
		onExpandedChange: setExpanded,
	});

	return (
		<div>
			<div className="flex items-center py-4"></div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row: any) => (
								<React.Fragment key={row.id}>
									<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell: any) => (
											<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
										))}
										<TableCell>
											<Button variant="ghost" className="h-8 w-8 p-0" onClick={row.getToggleExpandedHandler()}>
												{row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
											</Button>
										</TableCell>
									</TableRow>
									{row.getIsExpanded() && (
										<TableRow>
											<TableCell colSpan={columns.length + 1}>
												{/* <PurchasesPlansClient purchaseId={row.original.purchase.purchase_id} data={row.original.purchase.plans} /> */}
											</TableCell>
										</TableRow>
									)}
								</React.Fragment>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					Previous
				</Button>
				<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					Next
				</Button>
			</div>
		</div>
	);
}
