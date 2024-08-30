import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/global-context";
import ImgUploadComponent from "../../components/img-upload";
import InputComponent from "../../components/input";
import ModalButtons from "../../components/modal-buttons";

export default function UpdateModal() {
	const { updateTaskModal, setUpdatetaskModal, itemId, data, refetchData } =
		useGlobalContext();
	const [title, setTitle] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);

	useEffect(() => {
		const currentItem = data.find((item) => item.id === itemId);
		if (currentItem) {
			setTitle(currentItem.title || "");
			setNewImage(currentItem.image_src);
		}
	}, [itemId, data]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImage(file);
		}
	};

	const token = localStorage.getItem("loginToken");

	const updateCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		if (newImage) {
			formData.append("images", newImage);
		}

		fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${itemId}`, {
			method: "PUT",
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					toast.success(data.message);
					handleToggleModal();
					refetchData("brands");
				} else {
					toast.error(data.message);
				}
			});
	};

	const handleToggleModal = () => {
		setUpdatetaskModal(!updateTaskModal);
	};

	return (
		<section>
			<div
				onClick={handleToggleModal}
				className="fixed top-0 left-0 z-[400] bg-black/50 w-full h-[100vh]"
			></div>
			<div className="p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] rounded-lg bg-white z-[500]">
				<h2 className="font-semibold leading-none text-[20px]">Update item</h2>
				<form
					onSubmit={updateCategoryItem}
					className="flex flex-col space-y-4 mt-4"
				>
					<InputComponent
						setState={setTitle}
						value={title}
						label="Brand Name"
					/>

					<ImgUploadComponent
						handleUploadImage={handleImageChange}
						label="Upload Image"
					/>
					{/* Cancel Or Update Buttons */}
					<ModalButtons
						handleToggleModal={handleToggleModal}
						btntext="Update"
					/>
				</form>
			</div>
		</section>
	);
}
