import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ModalButtons from "../../components/modal-buttons";
import InputComponent from "../../components/inputs";
import ImgUploadComponent from "../../components/upload-img";
import { UseGlobalContext } from "../../context/global-context";
import { useToggleModal } from "../../hooks/helperFn";

export default function AddModal() {
	const { setData } = UseGlobalContext();
	const [nameEn, setNameEn] = useState("");
	const [nameRu, setNameRu] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);

	const formData = new FormData();
	formData.append("name_en", nameEn);
	formData.append("name_ru", nameRu);
	if (newImage) {
		formData.append("images", newImage);
	}

	// Get last uploaded img
	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImage(file);
		}
	};

	// Fetch main data
	const token = localStorage.getItem("loginToken");
	const addNewCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
			method: "POST",
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setData((prevData) => [...prevData, data.data]);
					toast.success(data.message);
				} else {
					toast.error(data.message);
				}
			});
	};

	return (
		<section>
			<div
				onClick={useToggleModal()}
				className="fixed top-0 left-0 z-[400] bg-black/50 w-full h-[100vh]"
			></div>
			<div className="p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] rounded-lg bg-white z-[500]">
				<h2 className="font-semibold leading-none text-[20px]">
					Add new items to the database
				</h2>
				<form
					onSubmit={addNewCategoryItem}
					className="flex flex-col space-y-4 mt-4"
				>
					<InputComponent setState={setNameEn} value={nameEn} label="Name_en" />
					<InputComponent setState={setNameRu} value={nameRu} label="Name_ru" />

					<ImgUploadComponent
						label="Upload Image"
						handleUploadImage={handleImageChange}
					/>

					{/* Cancel Or Add Buttons */}
					<ModalButtons handleToggleModal={useToggleModal()} btntext="Add" />
				</form>
			</div>
		</section>
	);
}
