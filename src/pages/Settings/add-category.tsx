import { ChangeEvent, FormEvent, useState } from "react";
import { useGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";
import InputComponent from "../../components/input";
import ImgUploadComponent from "../../components/img-upload";
import ModalButtons from "../../components/modal-buttons";

export default function AddModal() {
	const { addTaskModal, setAddtaskModal, setData } = useGlobalContext();
	const [nameEn, setNameEn] = useState("");
	const [nameRu, setNameRu] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);
	const formdata = new FormData();
	formdata.append("name_en", nameEn);
	formdata.append("name_ru", nameRu);
	if (newImage) {
		formdata.append("images", newImage);
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImage(file);
		}
	};

	const token = localStorage.getItem("loginToken");

	const addNewCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
			method: "POST",
			body: formdata,
			headers: {
				Authorization: `Bearer ${token}`,
				//"Content-Type": "multipart/form-data",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setData((prevData) => [...prevData, data.data]);
					toast.success(data.message);
					handleToggleModal();
				} else {
					toast.error(data.message);
				}
			});
	};

	const handleToggleModal = () => {
		setAddtaskModal(!addTaskModal);
	};

	return (
		<section>
			<div
				onClick={handleToggleModal}
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
						handleUploadImage={handleImageChange}
						label="Upload Image"
					/>

					{/* Cancel Or Add Buttons */}
					<ModalButtons handleToggleModal={handleToggleModal} btntext="Add" />
				</form>
			</div>
		</section>
	);
}
