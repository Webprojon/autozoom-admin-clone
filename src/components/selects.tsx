import { DataType } from "../hooks/types";

interface SelectTypeProps {
	setState: React.Dispatch<React.SetStateAction<string>>;
	value: string;
	label: string;
	items: DataType[];
}

export default function SelectComponent({
	items,
	setState,
	value,
	label,
}: SelectTypeProps) {
	return (
		<div className="flex flex-col">
			<label htmlFor={label} className="text-[15px]">
				<span className="text-red-500 text-[17px]">*</span> {label}
			</label>
			<select
				required
				id={label}
				value={value}
				onChange={(e) => setState(e.target.value)}
				className="outline-none border border-black/50 text-black/40 rounded-lg text-[15px] py-1 px-2 mt-1 cursor-pointer"
			>
				<option>{`Select ${label}`}</option>
				{items.map((item) => (
					<option key={item.id} value={item.id}>
						{item.name_en} {item.title} {item.name}
					</option>
				))}
			</select>
		</div>
	);
}
