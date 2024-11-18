import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UseGlobalContext } from "../../context/global-context";
import ModalButtons from "../../components/modal-buttons";
import InputComponent from "../../components/inputs";
import SelectComponent from "../../components/selects";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setCloseUpdateTaskModal } from "../../redux/slices-global";

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

export default function UpdateModal() {
	// Redux
	const dispatch: AppDispatch = useDispatch();
	const itemId = useSelector((state: RootState) => state.user.itemId);

	// Use Context
	const { data, refetchData } = UseGlobalContext();

	// New states
	const [brands, setBrands] = useState<DataType[]>([]);
	const [modelName, setModelName] = useState("");
	const [brandName, setBrandName] = useState("");

	// New form data
	const formData = new FormData();
	formData.append("name", modelName);
	formData.append("brand_id", brandName);

	// Get old data when modal open
	useEffect(() => {
		const currentItem = data.find((item) => item.id === itemId);
		if (currentItem) {
			setModelName(currentItem.name);
			setBrandName(currentItem.brand_id);
		}
	}, [itemId, data]);

	// Fetch main data
	const token = localStorage.getItem("loginToken");
	const updateCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${itemId}`, {
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
					refetchData("models");
				} else {
					toast.error(data.message);
				}
			});
	};

	// Toggle modal open or close
	const handleToggleModal = () => {
		dispatch(setCloseUpdateTaskModal());
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
				<h2 className="font-semibold leading-none text-[20px]">Update item</h2>
				<form
					onSubmit={updateCategoryItem}
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
