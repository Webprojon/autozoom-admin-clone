import toast from "react-hot-toast";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface DeleteIconProps {
	itemId: string;
	onDelete: (id: string) => void;
}

export default function DeleteIcon({ itemId, onDelete }: DeleteIconProps) {
	const token = localStorage.getItem("loginToken");

	const deleteItem = async () => {
		try {
			const response = await fetch(
				`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${itemId}`,
				{
					method: "delete",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (response.ok) {
				onDelete(itemId);
				toast.success("Successfully deleted !");
			}
		} catch (error) {
			toast.error("An error occurred while deleting the item");
		}
	};

	return (
		<RiDeleteBin5Fill
			onClick={deleteItem}
			className="size-7 text-red-500 cursor-pointer"
		/>
	);
}
