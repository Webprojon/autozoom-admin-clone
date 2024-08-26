import { useState, ChangeEvent } from "react";

interface ImgUploadCarsProps {
	handleUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

export default function ImgUploadComponent({
	handleUploadImage,
	label,
}: ImgUploadCarsProps) {
	const [uploadedImage, setUploadedImage] = useState<string | null>(null);

	//const [uploadedImage, setUploadedImage] = useState<string | null>(value);
	//useEffect(() => {
	//	setUploadedImage(value);
	//}, [value]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleUploadImage(e);

		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = (event) => {
				if (event.target) {
					setUploadedImage(event.target.result as string);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<label htmlFor="uploadcarimages" className="text-[15px]">
				<span className="text-red-500 text-[17px]">*</span> {label}
			</label>
			<div className="flex flex-row justify-start items-start relative gap-x-4 mt-1">
				{uploadedImage && (
					<img
						alt="Uploaded"
						//src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${uploadedImage}`}
						src={uploadedImage}
						className="w-[160px] h-[12vh] border border-dashed border-sky-800 rounded"
					/>
				)}
				<input
					required
					type="file"
					id="uploadcarimages"
					accept="image/*"
					onChange={handleImageChange}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				/>
				<button
					type="button"
					className="flex flex-col items-center justify-center h-[12vh] px-8 text-[15px] font-semibold border border-dashed border-sky-800 rounded bg-white text-gray-700"
				>
					<span className="text-[22px]">+</span>
					Upload
				</button>
			</div>
		</div>
	);
}
