import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin5Fill, RiErrorWarningFill } from "react-icons/ri";

interface DeleteIconProps {
	whichOne: string;
	itemId: string;
	onDelete: (id: string) => void;
}

export default function DeleteIcon({
	whichOne,
	itemId,
	onDelete,
}: DeleteIconProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const token = localStorage.getItem("loginToken");

	const deleteItem = async () => {
		try {
			const response = await fetch(
				`https://autoapi.dezinfeksiyatashkent.uz/api/${whichOne}/${itemId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.ok) {
				onDelete(itemId);
				toast.success("Successfully deleted!");
				setIsModalOpen(false);
			} else {
				const errorData = await response.json();
				toast.error(
					`Failed to delete: ${errorData.message || "Unknown error"}`,
				);
			}
		} catch (error) {
			toast.error("An error occurred while deleting the item");
		}
	};

	const handleDeleteConfirmation = () => {
		deleteItem();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{isModalOpen && (
				<>
					<div
						onClick={handleCancel}
						className="fixed inset-0 bg-black/40 z-40"
					></div>
					<div className="fixed top-[14rem] left-1/2 transform -translate-x-1/2 bg-white w-[400px] px-6 py-4 rounded-lg shadow-lg z-50">
						<div className="flex items-center">
							<RiErrorWarningFill className="size-6 mr-2 text-amber-500" />
							<span>Do you want to delete this item?</span>
						</div>
						<div className="mt-6 flex justify-end space-x-4">
							<button
								onClick={handleCancel}
								className="px-4 py-1 border border-slate-600 rounded-md"
							>
								Cancel
							</button>
							<button
								onClick={handleDeleteConfirmation}
								className="px-6 py-1 text-white bg-sky-600 hover:bg-sky-500 rounded-md"
							>
								Ok
							</button>
						</div>
					</div>
				</>
			)}

			<RiDeleteBin5Fill
				onClick={() => setIsModalOpen(true)}
				className="size-7 text-red-500 cursor-pointer"
			/>
		</>
	);
}
