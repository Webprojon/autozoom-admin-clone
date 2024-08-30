interface ModalButtonsProps {
	handleToggleModal: () => void;
	btntext: string;
}

export default function ModalButtons({
	handleToggleModal,
	btntext,
}: ModalButtonsProps) {
	return (
		<div className="space-x-4 self-end cursor-pointer text-[17px] transition-all">
			<button
				onClick={handleToggleModal}
				className="hover:bg-slate-800 hover:text-white border border-black/50 rounded-md py-1 px-5"
			>
				Cancel
			</button>
			<button className="hover:bg-slate-700 py-1 px-7 rounded-md bg-slate-800 text-white">
				{btntext}
			</button>
		</div>
	);
}
