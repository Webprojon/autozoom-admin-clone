import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/global-context";

export default function UpdateModal() {
	const { updateTaskModal, setUpdatetaskModal, itemId, data, refetchData } =
		useGlobalContext();
	const [title, setTitle] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);

	useEffect(() => {
		const currentItem = data.find((item) => item.id === itemId);
		if (currentItem) {
			setTitle(currentItem.title || "");
		}
	}, [itemId, data]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImage(file);
		}
	};

	const token = localStorage.getItem("loginToken");

	const updateCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		if (newImage) {
			formData.append("images", newImage);
		}

		fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${itemId}`, {
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
					refetchData("brands");
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
							Brand Name
						</label>
						<input
							required
							type="text"
							id="brand-name"
							autoComplete="off"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="outline-none mt-2 border border-black/50 text-black/70 w-full py-[5px] px-4 rounded-lg"
						/>
					</div>
					<div>
						<label htmlFor="upload_img" className="text-[15px]">
							Upload Image
						</label>
						<div className="relative">
							<input
								type="file"
								id="upload_img"
								accept="image/*"
								onChange={handleImageChange}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<button
								type="button"
								className="mt-2 py-6 px-8 text-[15px] font-semibold border border-dashed border-sky-800 rounded bg-white text-gray-700"
							>
								Upload
							</button>
						</div>
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
