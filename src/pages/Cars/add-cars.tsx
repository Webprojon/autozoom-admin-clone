import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/global-context";
import toast from "react-hot-toast";
import InputCars from "../../components/Input-cars";
import SelectCars from "../../components/Select-cars";

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

export default function AddModal() {
	const { addTaskModal, setAddtaskModal, setData } = useGlobalContext();
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
	const [imageCover, setImageCover] = useState<File | null>(null);
	const [imageMain, setImageMain] = useState<File | null>(null);

	const [color, setColor] = useState("");
	const [deposit, setDeposit] = useState("");
	const [driveSide, setDriveSide] = useState("");
	const [inclusive, setInclusive] = useState(false);
	const [limitPerDay, setLimitPerDay] = useState("");
	const [maxPeople, setMaxPeople] = useState("");
	const [maxSpeed, setMaxSpeed] = useState("");
	const [motor, setMotor] = useState("");
	const [petrol, setPetrol] = useState("");
	const [premiumProtection, setPremiumProtection] = useState("");
	const [priceInAed, setPriceInAed] = useState("");
	const [priceInAedSale, setPriceInAedSale] = useState("");
	const [priceInUsd, setPriceInUsd] = useState("");
	const [priceInUsdSale, setPriceInUsdSale] = useState("");
	const [seconds, setSecond] = useState("");
	const [transmission, setTransmission] = useState("");
	const [year, setYear] = useState("");

	// FormData
	const formdata = new FormData();
	formdata.append("category_id", categoryValue);
	formdata.append("brand_id", brandValue);
	formdata.append("model_id", modelValue);
	formdata.append("location_id", locationValue);
	formdata.append("city_id", cityValue);
	formdata.append("color", color);
	formdata.append("deposit", deposit || "");
	formdata.append("drive_side", driveSide);
	formdata.append("inclusive", inclusive ? "true" : "false");
	formdata.append("limitperday", limitPerDay || "");
	formdata.append("max_people", maxPeople || "");
	formdata.append("max_speed", maxSpeed);
	formdata.append("motor", motor);
	formdata.append("petrol", petrol);
	formdata.append("premium_protection", premiumProtection || "");
	formdata.append("price_in_aed", priceInAed);
	formdata.append("price_in_aed_sale", priceInAedSale);
	formdata.append("price_in_usd", priceInUsd);
	formdata.append("price_in_usd_sale", priceInUsdSale);
	formdata.append("seconds", seconds);
	formdata.append("transmission", transmission);
	formdata.append("year", year);
	if (newImage) {
		formdata.append("images", newImage);
	}
	if (imageCover) {
		formdata.append("cover", imageCover);
	}
	if (imageMain) {
		formdata.append("images", imageMain);
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImage(file);
		}
	};

	const handleImageCover = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageCover(file);
		}
	};

	const handleImageMain = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageMain(file);
		}
	};

	const token = localStorage.getItem("loginToken");

	const addNewCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch("https://autoapi.dezinfeksiyatashkent.uz/api/cars", {
			method: "POST",
			body: formdata,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setData((prevData) => [...prevData, data.data]);
					toast.success(data.message);
					handleToggleModal();
				} else {
					toast.error(data.message);
				}
			});
	};

	const handleToggleModal = () => {
		setAddtaskModal(!addTaskModal);
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
				<h2 className="font-semibold leading-none text-[20px]">
					Add new items to the database
				</h2>
				<form
					onSubmit={addNewCategoryItem}
					className="flex flex-col space-y-4 mt-4"
				>
					<SelectCars
						items={categories}
						setState={setCategoryValue}
						label="Category"
					/>
					<SelectCars items={brands} setState={setBrandValue} label="Brand" />
					<SelectCars items={models} setState={setModelValue} label="Model" />
					<SelectCars
						items={location}
						setState={setLocationValue}
						label="Location"
					/>
					<SelectCars items={cities} setState={setCityValue} label="City" />

					<InputCars setState={setColor} label="Color" />
					<InputCars setState={setYear} label="Year" />
					<InputCars setState={setSecond} label="Seconds" />
					<InputCars setState={setMaxSpeed} label="Speed" />
					<InputCars setState={setMaxPeople} label="Max People" />
					<InputCars setState={setMotor} label="Motor" />
					<InputCars setState={setTransmission} label="Transmission" />
					<InputCars setState={setDriveSide} label="Drive Side" />
					<InputCars setState={setPetrol} label="Fuel" />
					<InputCars setState={setLimitPerDay} label="Limit Per Day" />
					<InputCars setState={setDeposit} label="Deposit" />
					<InputCars
						setState={setPremiumProtection}
						label="Premium
							Protection Price"
					/>
					<InputCars setState={setPriceInAed} label="Price in AED" />
					<InputCars
						setState={setPriceInUsdSale}
						label="Price in
							USD (Otd)"
					/>
					<InputCars
						setState={setPriceInAedSale}
						label="Price in AED
							(Otd)"
					/>
					<InputCars setState={setPriceInUsd} label="Price in USD" />

					<label className="flex flex-col cursor-pointer">
						<span className="text-[15px] mb-2">
							<span className="text-red-500 text-[17px]">*</span> Inclusive
						</span>
						<input
							type="checkbox"
							className="sr-only peer"
							onChange={(e) => setInclusive(e.target.checked)}
						/>
						<div className="relative w-11 h-6 bg-gray-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					</label>

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
								onChange={handleImageMain}
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
								onChange={handleImageCover}
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
						<button
							type="submit"
							className="hover:bg-slate-700 py-1 px-7 rounded-md bg-slate-800 text-white"
						>
							Add
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}