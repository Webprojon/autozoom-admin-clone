import { FormEvent, useState } from "react";
import { useGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";

export default function AddModal() {
	const { addTaskModal, setAddtaskModal, data, setData, refetchData } =
		useGlobalContext();
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
					<div>
						<label htmlFor="brand-name" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Model Name
						</label>
						<input
							required
							type="text"
							id="brand-name"
							autoComplete="off"
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
							Add
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
