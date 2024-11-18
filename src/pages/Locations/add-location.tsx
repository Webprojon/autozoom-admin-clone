import { ChangeEvent, FormEvent, useState } from "react";
import { UseGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";
import ModalButtons from "../../components/modal-buttons";
import InputComponent from "../../components/inputs";
import ImgUploadComponent from "../../components/upload-img";
import { setCloseAddTaskModal } from "../../redux/slices-global";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";

export default function AddModal() {
	// Redux
	const dispatch: AppDispatch = useDispatch();

	// 	// Use Context
	const { setData } = UseGlobalContext();

	// New states
	const [cityName, setCityName] = useState("");
	const [cityText, setCityText] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);

	// New form data
	const formData = new FormData();
	formData.append("name", cityName);
	formData.append("text", cityText);
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

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations", {
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
					handleToggleModal();
				} else {
					toast.error(data.message);
				}
			});
	};

	// Toggle modal open or close
	const handleToggleModal = () => {
		dispatch(setCloseAddTaskModal());
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
					<InputComponent
						setState={setCityName}
						value={cityName}
						label="Location"
					/>
					<InputComponent
						setState={setCityText}
						value={cityText}
						label="City Name"
					/>

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
