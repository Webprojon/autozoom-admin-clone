interface InputTypeProps {
	setState: React.Dispatch<React.SetStateAction<string>>;
	value: string;
	label: string;
}

export default function InputComponent({
	setState,
	value,
	label,
}: InputTypeProps) {
	return (
		<div>
			<label htmlFor={label} className="text-[15px]">
				<span className="text-red-500 text-[17px]">*</span> {label}
			</label>
			<input
				required
				type="text"
				id={label}
				autoComplete="off"
				value={value}
				onChange={(e) => setState(e.target.value)}
				className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
			/>
		</div>
	);
}
