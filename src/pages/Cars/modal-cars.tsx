import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/global-context";

interface DataType {
	id: string;
	name_en: string;
	name_ru: string;
	image_src: string;
	title: string;
	name: string;
	brand_title: string;
	brand_id: string;
	text: string;
}

export default function UpdateModal() {
	const { updateTaskModal, setUpdatetaskModal, itemId, data, refetchData } =
		useGlobalContext();
	const [categories, setCategories] = useState<DataType[]>([]);
	const [brands, setBrands] = useState<DataType[]>([]);
	const [models, setModels] = useState<DataType[]>([]);
	const [location, setLocation] = useState<DataType[]>([]);
	const [cities, setCities] = useState<DataType[]>([]);

	const [categoryValue, setCategoryValue] = useState("");
	const [brandValue, setBrandValue] = useState("");
	const [modelValue, setModelValue] = useState("");
	const [locationValue, setLocationValue] = useState("");
	const [cityValue, setCityValue] = useState("");
	const [newImage, setNewImage] = useState<File | null>(null);
	const formData = new FormData();
	formData.append("category.name_en", categoryValue);
	formData.append("brand.title", brandValue);
	formData.append("model.name", modelValue);
	formData.append("location.name", locationValue);
	formData.append("city.name", cityValue);
	//formdata.append("color", cityValue);
	//formdata.append("deposit", cityValue);
	//formdata.append("drive_side", cityValue);
	//formdata.append("four_days_price", cityValue);
	//formdata.append("inclusive", cityValue);
	//formdata.append("limitperday", cityValue);
	//formdata.append("limitperday", cityValue);
	//formdata.append("max_people", cityValue);
	//formdata.append("max_speed", cityValue);
	//formdata.append("motor", cityValue);
	//formdata.append("petrol", cityValue);
	//formdata.append("premium_protection", cityValue);
	//formdata.append("price_in_aed", cityValue);
	//formdata.append("price_in_aed_sale", cityValue);
	//formdata.append("price_in_usd", cityValue);
	//formdata.append("price_in_usd_sale", cityValue);
	//formdata.append("seconds", cityValue);
	//formdata.append("three_days_price", cityValue);
	//formdata.append("transmission", cityValue);
	//formdata.append("two_days_price", cityValue);
	//formdata.append("year", cityValue);
	if (newImage) {
		formData.append("images", newImage);
	}	

	//useEffect(() => {
	//	const currentItem = data.find((item) => item.id === itemId);
	//	if (currentItem) {
	//		setCategories(currentItem.name_en);
	//		setBrands(currentItem.title);
	//		setModels(currentItem.name);
	//		setLocation(currentItem.name);
	//		setCities(currentItem.name);
	//	}
	//}, [itemId, data]);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImage(file);
		}
	};

	const token = localStorage.getItem("loginToken");

	const updateCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/cars/${itemId}`, {
			method: "PUT",
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					toast.success(data.message);
					handleToggleModal();
					refetchData("cars");
				} else {
					toast.error(data.message);
				}
			});
	};

	const handleToggleModal = () => {
		setUpdatetaskModal(!updateTaskModal);
	};

	useEffect(() => {
		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
			.then((response) => response.json())
			.then((data) => {
				setCategories(data.data);
			})
			.catch((error) => console.log(error));

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
			.then((response) => response.json())
			.then((data) => {
				setBrands(data.data);
			})
			.catch((error) => console.log(error));

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
			.then((response) => response.json())
			.then((data) => {
				setModels(data.data);
			})
			.catch((error) => console.log(error));

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/locations")
			.then((response) => response.json())
			.then((data) => {
				setLocation(data.data);
			})
			.catch((error) => console.log(error));

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
			.then((response) => response.json())
			.then((data) => {
				setCities(data.data);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<section>
			<div
				onClick={handleToggleModal}
				className="fixed top-0 left-0 z-[400] bg-black/50 w-full h-[100vh]"
			></div>
			<div
				className="p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[55vh] no-scrollbar overflow-y-auto
			 rounded-lg bg-white z-[500]"
			>
				<h2 className="font-semibold leading-none text-[20px]">Update item</h2>
				<form
					onSubmit={updateCategoryItem}
					className="flex flex-col space-y-4 mt-4"
				>
					<div className="flex flex-col">
						<label htmlFor="category" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Category
						</label>
						<select
							required
							id="category"
							onChange={(e) => setCategoryValue(e.target.value)}
							className="outline-none border border-black/50 text-black/40 rounded-lg text-[15px] py-1 px-2 mt-1 cursor-pointer"
						>
							<option>Select Category</option>
							{categories.map((item) => (
								<option key={item.id} value={item.name_en}>
									{item.name_en}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col">
						<label htmlFor="brand" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Brand
						</label>
						<select
							required
							id="brand"
							onChange={(e) => setBrandValue(e.target.value)}
							className="outline-none border border-black/50 text-black/40 rounded-lg text-[15px] py-1 px-2 mt-1 cursor-pointer"
						>
							<option>Select Brand</option>
							{brands.map((item) => (
								<option key={item.id} value={item.title}>
									{item.title}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col">
						<label htmlFor="model" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Model
						</label>
						<select
							required
							id="model"
							onChange={(e) => setModelValue(e.target.value)}
							className="outline-none border border-black/50 text-black/40 rounded-lg text-[15px] py-1 px-2 mt-1 cursor-pointer"
						>
							<option>Select Model</option>
							{models.map((item) => (
								<option key={item.id} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col">
						<label htmlFor="location" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Location
						</label>
						<select
							required
							id="location"
							onChange={(e) => setLocationValue(e.target.value)}
							className="outline-none border border-black/50 text-black/40 rounded-lg text-[15px] py-1 px-2 mt-1 cursor-pointer"
						>
							<option>Select Location</option>
							{location.map((item) => (
								<option key={item.id} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					<div className="flex flex-col">
						<label htmlFor="city" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> City
						</label>
						<select
							required
							id="city"
							onChange={(e) => setCityValue(e.target.value)}
							className="outline-none border border-black/50 text-black/40 rounded-lg text-[15px] py-1 px-2 mt-1 cursor-pointer"
						>
							<option>Select City</option>
							{cities.map((item) => (
								<option key={item.id} value={item.name}>
									{item.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label htmlFor="color" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Color
						</label>
						<input
							required
							type="text"
							id="color"
							autoComplete="off"
							//onChange={(e) => setCountry(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="year" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Year
						</label>
						<input
							required
							type="text"
							id="year"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="seconds" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Seconds
						</label>
						<input
							required
							type="text"
							id="seconds"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="speed" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Speed
						</label>
						<input
							required
							type="text"
							id="speed"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="people" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Max People
						</label>
						<input
							required
							type="text"
							id="people"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="motor" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Motor
						</label>
						<input
							required
							type="text"
							id="motor"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="transmission" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Transmission
						</label>
						<input
							required
							type="text"
							id="transmission"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="driveside" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Drive Side
						</label>
						<input
							required
							type="text"
							id="driveside"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="fuel" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Fuel
						</label>
						<input
							required
							type="text"
							id="fuel"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="limitperday" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Limit Per Day
						</label>
						<input
							required
							type="text"
							id="limitperday"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="deposit" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Deposit
						</label>
						<input
							required
							type="text"
							id="deposit"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="premiumprotectionprice" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Premium
							Protection Price
						</label>
						<input
							required
							type="text"
							id="premiumprotectionprice"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="priceinaed" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Price in AED
						</label>
						<input
							required
							type="text"
							id="priceinaed"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="priceinusdotd" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Price in
							USD(Otd)
						</label>
						<input
							required
							type="text"
							id="priceinusdotd"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="priceinaedotd" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Price in AED
							(Otd)
						</label>
						<input
							required
							type="text"
							id="priceinaedotd"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="priceinusd" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Price in USD
						</label>
						<input
							required
							type="text"
							id="priceinusd"
							autoComplete="off"
							//onChange={(e) => setCityName(e.target.value)}
							className="outline-none border border-black/50 text-black/70 w-full text-[15px] py-1 px-2 mt-1 rounded-lg"
						/>
					</div>

					<div>
						<label htmlFor="uploadcarimages" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Upload car
							images
						</label>
						<div className="relative">
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
								className="flex flex-col items-center mt-2 py-5 px-8 text-[15px] font-semibold border border-dashed border-sky-800 rounded bg-white text-gray-700"
							>
								<span className="text-[22px]">+</span>
								Upload
							</button>
						</div>
					</div>

					<div>
						<label htmlFor="themainimage" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Upload the
							main image
						</label>
						<div className="relative">
							<input
								required
								type="file"
								id="themainimage"
								accept="image/*"
								onChange={handleImageChange}
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

					<div>
						<label htmlFor="themainimage" className="text-[15px]">
							<span className="text-red-500 text-[17px]">*</span> Upload the
							cover image
						</label>
						<div className="relative">
							<input
								required
								type="file"
								id="themainimage"
								accept="image/*"
								onChange={handleImageChange}
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

					<div className="space-x-4 self-end cursor-pointer text-[17px] transition-all">
						<button
							onClick={handleToggleModal}
							className="hover:bg-slate-800 hover:text-white border border-black/50 rounded-md py-1 px-5"
						>
							Cancel
						</button>
						<button className="hover:bg-slate-700 py-1 px-7 rounded-md bg-slate-800 text-white">
							Update
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
