import { FaEdit } from "react-icons/fa";
import { useGlobalContext } from "../../context/global-context";

export default function UpdateIcon() {
	const { updateTaskModal, setUpdatetaskModal } = useGlobalContext();

	return (
		<div
			onClick={() => setUpdatetaskModal(!updateTaskModal)}
			className="relative"
		>
			<FaEdit className="size-7 text-sky-600" />
		</div>
	);
}
