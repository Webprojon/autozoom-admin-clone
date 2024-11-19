import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UseGlobalContext } from "../../context/global-context";
import ModalButtons from "../../components/modal-buttons";
import InputComponent from "../../components/inputs";
import SelectComponent from "../../components/selects";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { DataType } from "../../hooks/types";
import { useToggleUpdateModal } from "../../hooks/helperFn";

export default function UpdateModal() {
	const itemId = useSelector((state: RootState) => state.user.itemId);
	const { data, refetchData } = UseGlobalContext();
	const [brands, setBrands] = useState<DataType[]>([]);
	const [modelName, setModelName] = useState("");
	const [brandName, setBrandName] = useState("");

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
					refetchData("models");
				} else {
					toast.error(data.message);
				}
			});
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
				onClick={useToggleUpdateModal()}
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
						handleToggleModal={useToggleUpdateModal()}
						btntext="Update"
					/>
				</form>
			</div>
		</section>
	);
}
