import { useEffect, useState } from "react";
import UpdateIcon from "../components/Update";
import DeleteIcon from "../components/Delete";
import { MdFormatListBulletedAdd } from "react-icons/md";

interface DataType {
	id: string;
	name_en: string;
	name_ru: string;
	image_src: string;
}

export default function Settings() {
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const response = await fetch(
				"https://autoapi.dezinfeksiyatashkent.uz/api/categories",
			);
			const res = await response.json();

			if (res.success) {
				setData(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<section className="ml-[18.5rem] mt-2">
			<div className="flex justify-between items-center mr-5 font-semibold tracking-wide">
				<h2 className="text-black/75 text-[20px]">Settings</h2>
				<button className="bg-slate-800 text-slate-300 flex items-center px-4 py-[5px] rounded-md hover:bg-slate-600 transition-all">
					<MdFormatListBulletedAdd className="mr-2" />
					Add new
				</button>
			</div>

			<main className="mt-4 w-[1206px]">
				<div className="bg-slate-800 w-full py-4 px-6 rounded-t-lg">
					<ul className="flex justify-between tracking-wider font-semibold text-slate-300 text-[18px]">
						<li className="w-[14rem]">Car Names</li>
						<li className="w-[14rem]">Car Names</li>
						<li className="w-[5rem]">Images</li>
						<li>Actions</li>
					</ul>
				</div>

				<div className="w-full p-6 h-[70vh] bg-slate-200 rounded-b-lg overflow-y-scroll no-scrollbar">
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
							<li className="w-[4rem] flex items-center gap-x-4 cursor-pointer">
								<UpdateIcon />
								<DeleteIcon />
							</li>
						</ul>
					))}
				</div>
			</main>
		</section>
	);
}
