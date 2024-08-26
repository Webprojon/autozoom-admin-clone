import { FormEvent, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";
import InputComponent from "../../components/Input";
import SelectComponent from "../../components/Select";

interface DataType {
	id: string;
	name_en: string;
	name_ru: string;
	image_src: string;
	title: string;
	name: string;
	brand_title: string;
	text: string;
	category_id: string;
	brand_id: string;
	model_id: string;
	location_id: string;
	city_id: string;
}

export default function AddModal() {
	const { addTaskModal, setAddtaskModal, setData, refetchData } =
		useGlobalContext();
	const [brands, setBrands] = useState<DataType[]>([]);
	const [modelName, setModelName] = useState("");
	const [brandName, setBrandName] = useState("");

	const token = localStorage.getItem("loginToken");

	const addNewCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formdata = new FormData();
		formdata.append("name", modelName);
		formdata.append("brand_id", brandName);

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
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
					refetchData("models");
				} else {
					toast.error(data.message);
				}
			});
	};

	const handleToggleModal = () => {
		setAddtaskModal(!addTaskModal);
	};

	useEffect(() => {
		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
			.then((response) => response.json())
			.then((data) => {
				setBrands(data.data);
			})
			.catch((error) => console.log(error));
	}, []);

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
						setState={setModelName}
						value={modelName}
						label="Model Name"
					/>

					<div className="w-[170px]">
						<SelectComponent
							items={brands}
							setState={setBrandName}
							value={brandName}
							label="Brand Name"
						/>
					</div>

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
