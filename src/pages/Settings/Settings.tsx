import { useEffect } from "react";
import DeleteIcon from "./delete-category";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useGlobalContext } from "../../context/global-context";
import { ClockLoader } from "react-spinners";
import AddModal from "./add-category";
import UpdateModal from "./modal-category";
import { FaEdit } from "react-icons/fa";

export default function Settings() {
	const {
		addTaskModal,
		setAddtaskModal,
		updateTaskModal,
		setUpdatetaskModal,
		setItemId,
		data,
		setData,
		setLoader,
		loader,
	} = useGlobalContext();

	const getCategoriesData = () => {
		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
			.then((response) => response.json())
			.then((data) => {
				setData(data.data);
				setLoader(false);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getCategoriesData();
	}, []);

	const handleDelete = (id: string) => {
		setData((prevData) => prevData.filter((item) => item.id !== id));
	};

	return (
		<section className="ml-[18.3rem] mt-2">
			{addTaskModal ? <AddModal /> : null}
			{updateTaskModal ? <UpdateModal /> : null}
			<div className="flex justify-between items-center mr-6 font-semibold tracking-wide">
				<h2 className="text-black/75 text-[20px]">Settings</h2>
				<button
					onClick={() => setAddtaskModal(!addTaskModal)}
					className="bg-slate-800 text-slate-300 flex items-center px-4 py-[5px] rounded-md hover:bg-slate-700 transition-all"
				>
					<MdFormatListBulletedAdd className="mr-2" />
					Add new
				</button>
			</div>

			<main className="mt-4 w-[98%]">
				<div className="bg-slate-800 w-full py-4 px-6 rounded-t-lg">
					<ul className="flex justify-between tracking-wider font-semibold text-slate-300 text-[18px]">
						<li className="w-[14rem]">Name_en</li>
						<li className="w-[14rem]">Name_ru</li>
						<li className="w-[5rem]">Image</li>
						<li>Action</li>
					</ul>
				</div>

				<div className="w-full p-6 h-[72vh] bg-slate-200 rounded-b-lg overflow-y-scroll no-scrollbar">
					{loader && (
						<div className="flex justify-center items-center h-full">
							<ClockLoader color="#1e293b" loading={loader} />
						</div>
					)}

					{data.map((item) => (
						<ul
							key={item.id}
							className="flex items-center justify-between capitalize border-b py-4 border-slate-300 font-semibold cursor-pointer text-slate-700 tracking-wide"
						>
							<li className="w-[14rem]">{item.name_en}</li>
							<li className="w-[14rem]">{item.name_ru}</li>
							<li className="w-[5rem]">
								<img
									src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
									alt="imgs"
								/>
							</li>
							<li
								onClick={() => setItemId(item.id)}
								className="w-[4.6rem] flex items-center gap-x-4 cursor-pointer"
							>
								{/* Update Button */}
								<div
									onClick={() => setUpdatetaskModal(!updateTaskModal)}
									className="relative"
								>
									<FaEdit className="size-7 text-sky-600" />
								</div>

								{/* Delete Button */}
								<DeleteIcon itemId={item.id} onDelete={handleDelete} />
							</li>
						</ul>
					))}
				</div>
			</main>
		</section>
	);
}
