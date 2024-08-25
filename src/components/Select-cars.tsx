interface DataType {
	id: string;
	name_en: string;
	name_ru: string;
	image_src: string;
	title: string;
	name: string;
	brand_title: string;
	text: string;
	category_id: string;
	brand_id: string;
	model_id: string;
	location_id: string;
	city_id: string;
}

interface SelectTypeProps {
	setState: React.Dispatch<React.SetStateAction<string>>;
	label: string;
	items: DataType[];
}

export default function SelectCars({
	items,
	setState,
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
