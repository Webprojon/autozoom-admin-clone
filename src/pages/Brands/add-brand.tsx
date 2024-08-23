import { ChangeEvent, FormEvent, useState } from "react";
import { useGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";

export default function AddModal() {
	const { addTaskModal, setAddtaskModal, setData } = useGlobalContext();
	const [title, setTitle] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);
	const formdata = new FormData();
	formdata.append("title", title);
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

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
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
					<div>
						<label htmlFor="brand-name" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Brand Name
						</label>
						<input
							required
							type="text"
							id="brand-name"
							autoComplete="off"
							onChange={(e) => setTitle(e.target.value)}
							className="outline-none mt-2 border border-black/50 text-black/70 w-full py-[5px] px-4 rounded-lg"
						/>
					</div>
					<div>
						<label htmlFor="upload_img" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Upload Image
						</label>
						<div className="relative">
							<input
								required
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
							Add
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
