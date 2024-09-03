"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
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

import { Badge } from "@/components/ui/badge";
import { PermissionsCodes } from "@/constants/permissionsCodes";
import { useUserContext } from "@/context/userContext";
import { cn } from "@/lib/utils";
import { useDeletePurchasePlan } from "@/providers/purchases";
import moment from "moment";
import { PurchasesPlansColumn } from "./columns";
import { AlertModal } from "./modals/AlertModal";
import { PurchasePlanModal } from "./modals/PurchasePlanModal";

interface CellActionProps {
	data: PurchasesPlansColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success("Plan ID copied to clipboard.");
	};
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const handleOpen = (id: string) => {
		setOpen(true);
	};
	const { permissionCodes } = useUserContext();

	const handleClose = () => {
		setOpen(false);
	};

	const dateFormat = "MMM Do YYYY, h:mm:ss a";

	const expiryDate = moment(data.expiry_at, dateFormat);

	const isExpired = expiryDate.isBefore(moment());

	const [openDelete, setDeleteOpen] = useState(false);

	const [loading, setLoading] = useState(false);

	const { mutateAsync: deletePurchasePlan } = useDeletePurchasePlan();

	const onConfirm = async () => {
		try {
			setLoading(true);
			//logic for soft delete
			const response = deletePurchasePlan({
				purchaseId: data.plan.purchase_id,
				purchasePlan: {
					plan_id: data.plan.plan_id,
					purchase_id: data.plan.purchase_id,
					plan_type_id: data.plan_type.plan_type_id
				}
			});
			toast.promise(response, {
				loading: "Deleting Purchase Plans ...",
				success: "Purchase Plans  deleted!",
				error: "Failed to delete Purchase Plans .",
			});

		} catch (error) {
			toast.error("Failed to delete the Purchase Planss");
		} finally {
			setDeleteOpen(false);
			setLoading(false);
		}
	};

	return (
		<>
			<AlertModal isOpen={openDelete} onClose={() => setDeleteOpen(false)} onConfirm={onConfirm} loading={loading} />

			<PurchasePlanModal purchaseId={data.plan.purchase_id} setOpen={setOpen} isOpen={open} onClose={handleClose} initialData={data} />

			<Badge className={cn("text-xs h-6  bg-red-600 dark:text-white opacity-0 mt-1", isExpired && "opacity-100")}>
				Expired
			</Badge>
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
						<DropdownMenuItem onClick={() => onCopy(data.plan.plan_id)}>
							<Copy className="mr-2 h-4 w-4" /> Copy Id
						</DropdownMenuItem>
						{permissionCodes.includes(PermissionsCodes.WRITE_ALL) && (
							<DropdownMenuItem onClick={() => handleOpen(data.plan.plan_id)}>
								<Edit className="mr-2 h-4 w-4" /> Update
							</DropdownMenuItem>
						)}
						{permissionCodes.includes(PermissionsCodes.WRITE_ALL) && (
							<DropdownMenuItem onClick={() => setDeleteOpen(true)}>
								<Trash className="mr-2 h-4 w-4" /> Delete
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</>
	);
};
