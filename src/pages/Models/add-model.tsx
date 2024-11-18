import { FormEvent, useEffect, useState } from "react";
import { UseGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";
import ModalButtons from "../../components/modal-buttons";
import InputComponent from "../../components/inputs";
import SelectComponent from "../../components/selects";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setCloseAddTaskModal } from "../../redux/slices-global";

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
	// Redux
	const dispatch: AppDispatch = useDispatch();

	// Use Context
	const { setData, refetchData } = UseGlobalContext();
	// New states
	const [brands, setBrands] = useState<DataType[]>([]);
	const [modelName, setModelName] = useState("");
	const [brandName, setBrandName] = useState("");

	// New form data
	const formData = new FormData();
	formData.append("name", modelName);
	formData.append("brand_id", brandName);

	// Fetch main data
	const token = localStorage.getItem("loginToken");
	const addNewCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
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
					refetchData("models");
				} else {
					toast.error(data.message);
				}
			});
	};

	// Toggle modal open or close
	const handleToggleModal = () => {
		dispatch(setCloseAddTaskModal());
	};

	// Get data value for Select
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

					{/* Cancel Or Add Buttons */}
					<ModalButtons handleToggleModal={handleToggleModal} btntext="Add" />
				</form>
			</div>
		</section>
	);
}
