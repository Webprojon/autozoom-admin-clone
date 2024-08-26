import { ChangeEvent } from "react";

interface ImgUploadCarsProps {
	handleUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

export default function ImgUploadComponent({
	handleUploadImage,
	label,
}: ImgUploadCarsProps) {
	return (
		<div>
			<label htmlFor="uploadcarimages" className="text-[15px]">
				<span className="text-red-500 text-[17px]">*</span> {label}
			</label>
			<div className="relative">
				<input
					required
					type="file"
					id="uploadcarimages"
					accept="image/*"
					onChange={handleUploadImage}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				/>
				<button
					type="button"
					className="flex flex-col items-center mt-2 py-5 px-8 text-[15px] font-semibold border border-dashed border-sky-800 rounded bg-white text-gray-700"
				>
					<span className="text-[22px]">+</span>
					Upload
				</button>
			</div>
		</div>
	);
}
