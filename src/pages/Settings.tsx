import { useEffect, useState } from "react";
import UpdateIcon from "../components/Update";
import DeleteIcon from "../components/Delete";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useGlobalContext } from "../context/global-context";

interface DataType {
	id: string;
	name_en: string;
	name_ru: string;
	image_src: string;
}

export default function Settings() {
	const { isModalOpen, setIsModalOpen, setItemId } = useGlobalContext();
	const [data, setData] = useState<DataType[]>([]);

	const getData = async () => {
		try {
			const response = await fetch(
				"https://autoapi.dezinfeksiyatashkent.uz/api/categories",
			);
			const res = await response.json();

			if (res.success) {
				setData(res.data);
				getData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleDelete = (id: string) => {
		setData((prevData) => prevData.filter((item) => item.id !== id));
	};

	return (
		<section className="ml-[18.3rem] mt-2">
			<div className="flex justify-between items-center mr-5 font-semibold tracking-wide">
				<h2 className="text-black/75 text-[20px]">Settings</h2>
				<button
					onClick={() => setIsModalOpen(!isModalOpen)}
					className="bg-slate-800 text-slate-300 flex items-center px-4 py-[5px] rounded-md hover:bg-slate-700 transition-all"
				>
					<MdFormatListBulletedAdd className="mr-2" />
					Add new
				</button>
			</div>

			<main className="mt-4 w-[1206px]">
				<div className="bg-slate-800 w-full py-4 px-6 rounded-t-lg">
					<ul className="flex justify-between tracking-wider font-semibold text-slate-300 text-[18px]">
						<li className="w-[14rem]">Name_en</li>
						<li className="w-[14rem]">Name_ru</li>
						<li className="w-[5rem]">Image</li>
						<li>Action</li>
					</ul>
				</div>

				<div className="w-full p-6 h-[72vh] bg-slate-200 rounded-b-lg overflow-y-scroll no-scrollbar">
					{data.map((item: DataType) => (
						<ul
							key={item.id}
							className="flex items-center justify-between cursor-pointer text-slate-700 tracking-wide"
						>
							<li className="w-[14rem] font-medium text-[15px]">
								{item.name_en}
							</li>
							<li className="w-[14rem] font-medium text-[15px]">
								{item.name_ru}
							</li>
							<li className="w-[5rem]">
								<img
									src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}
									alt="imgs"
								/>
							</li>
							<li
								onClick={() => setItemId(item.id)}
								className="w-[4rem] flex items-center gap-x-4 cursor-pointer"
							>
								<UpdateIcon />
								<DeleteIcon itemId={item.id} onDelete={handleDelete} />
							</li>
						</ul>
					))}
				</div>
			</main>
		</section>
	);
}
