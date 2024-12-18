import { MdFormatListBulletedAdd } from "react-icons/md";
import { ClockLoader } from "react-spinners";
import AddModal from "../Cars/add-cars";
import UpdateModal from "../Cars/modal-cars";
import { FaEdit } from "react-icons/fa";
import DeleteIcon from "../../components/delete-item";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useFetch } from "../../hooks/useFetchCustomHook";
import {
	setItemId,
	setToggleAddModal,
	setToggleUpdateModal,
} from "../../redux/slices-global";

export default function Cars() {
	const dispatch: AppDispatch = useDispatch();
	const { toggleAddModal, toggleUpdateModal } = useSelector(
		(state: RootState) => state.user,
	);

	const { data, setData, loading } = useFetch("cars");

	// Define Id to delete
	const handleDelete = (id: string) => {
		setData((prevData) => prevData.filter((item) => item.id !== id));
	};

	return (
		<section className="ml-[18.3rem] mt-2">
			{toggleAddModal && <AddModal />}
			{toggleUpdateModal && <UpdateModal />}
			<div className="flex justify-between items-center mr-6 font-semibold tracking-wide">
				<h2 className="text-black/75 text-[20px]">Cars</h2>
				<button
					onClick={() => dispatch(setToggleAddModal())}
					className="bg-slate-800 text-slate-300 flex items-center px-4 py-[5px] rounded-md hover:bg-slate-700 transition-all"
				>
					<MdFormatListBulletedAdd className="mr-2" />
					Add new
				</button>
			</div>

			<main className="mt-4 w-[98%]">
				<div className="bg-slate-800 w-full py-4 px-6 rounded-t-lg">
					<ul className="flex justify-between tracking-wider font-semibold text-slate-300 text-[18px]">
						<li className="w-[14rem]">Brand</li>
						<li className="w-[14rem]">Model</li>
						<li className="w-[14rem]">Color</li>
						<li className="w-[14rem]">City</li>
						<li>Action</li>
					</ul>
				</div>

				<div className="w-full p-6 h-[72vh] bg-slate-200 rounded-b-lg overflow-y-scroll no-scrollbar">
					{loading && (
						<div className="flex justify-center items-center h-full">
							<ClockLoader color="#1e293b" loading={loading} />
						</div>
					)}

					{data?.map((item) => (
						<ul
							key={item.id}
							className="flex items-center justify-between capitalize border-b py-3 border-slate-300 font-semibold cursor-pointer text-slate-700 tracking-wide"
						>
							<li className="w-[14rem]">{item.category.name_en}</li>
							<li className="w-[14rem]">{item.model.name}</li>
							<li className="w-[14rem]">{item.color}</li>
							<li className="w-[14rem]">{item.city.name}</li>
							<li
								onClick={() => dispatch(setItemId(item.id))}
								className="w-[4.6rem] flex items-center gap-x-4 cursor-pointer"
							>
								{/* Update Button */}
								<div
									className="relative"
									onClick={() => dispatch(setToggleUpdateModal())}
								>
									<FaEdit className="size-7 text-sky-600" />
								</div>

								{/* Delete Button */}
								<DeleteIcon whichOne="cars" onDelete={handleDelete} />
							</li>
						</ul>
					))}
				</div>
			</main>
		</section>
	);
}
