import { ChangeEvent, FormEvent, useState } from "react";
import { useGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";
import InputComponent from "../../components/Input";
import ImgUploadComponent from "../../components/Img-Upload";

export default function AddModal() {
	const { addTaskModal, setAddtaskModal, setData } = useGlobalContext();
	const [country, setCountry] = useState("");
	const [cityName, setCityName] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);
	const formdata = new FormData();
	formdata.append("name", country);
	formdata.append("text", cityName);
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

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities", {
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
					<InputComponent
						setState={setCountry}
						value={country}
						label="Country"
					/>
					<InputComponent
						setState={setCityName}
						value={cityName}
						label="City Name"
					/>

					<ImgUploadComponent
						handleUploadImage={handleImageChange}
						label="Upload Image"
					/>

					<div className="space-x-4 self-end cursor-pointer text-[17px] transition-all">
						<button
							onClick={handleToggleModal}
							className="hover:bg-slate-800 hover:text-white border border-black/50 rounded-md py-1 px-5"
						>
							Cancel
						</button>
						<button className="hover:bg-slate-700 py-1 px-7 rounded-md bg-slate-800 text-white">
							Add
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
