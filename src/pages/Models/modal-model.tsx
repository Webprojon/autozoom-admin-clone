import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/global-context";

export default function UpdateModal() {
	const { updateTaskModal, setUpdatetaskModal, itemId, data, refetchData } =
		useGlobalContext();
	const [modelName, setModelName] = useState("");
	const [brandName, setBrandName] = useState("");

	useEffect(() => {
		const currentItem = data.find((item) => item.id === itemId);
		if (currentItem) {
			setModelName(currentItem.name);
			setBrandName(currentItem.brand_id);
		}
	}, [itemId, data]);

	const token = localStorage.getItem("loginToken");

	const updateCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", modelName);
		formData.append("brand_id", brandName);

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
					<div>
						<label htmlFor="brand-name" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Model Name
						</label>
						<input
							required
							type="text"
							id="brand-name"
							autoComplete="off"
							value={modelName}
							onChange={(e) => setModelName(e.target.value)}
							className="outline-none mt-2 border border-black/50 text-black/70 w-full py-[5px] px-4 rounded-lg"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="brand-name" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Brand Name
						</label>
						<select
							required
							id="brand-name"
							value={brandName}
							onChange={(e) => setBrandName(e.target.value)}
							className="outline-none w-[160px] border border-black/50 text-black/70 rounded-lg py-[5px] px-4 mt-2 cursor-pointer"
						>
							<option>Select Brand</option>
							{data?.map((item) => (
								<option key={item.id} value={item.brand_id}>
									{item.brand_title}
								</option>
							))}
						</select>
					</div>

					<div className="space-x-4 self-end cursor-pointer text-[17px] transition-all">
						<button
							onClick={handleToggleModal}
							className="hover:bg-slate-800 hover:text-white border border-black/50 rounded-md py-1 px-5"
						>
							Cancel
						</button>
						<button className="hover:bg-slate-700 py-1 px-7 rounded-md bg-slate-800 text-white">
							Update
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
