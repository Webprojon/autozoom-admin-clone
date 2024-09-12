import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/global-context";
import ModalButtons from "../../components/modal-buttons";
import SelectComponent from "../../components/selects";
import InputComponent from "../../components/inputs";
import ImgUploadComponent from "../../components/upload-img";
import { setCloseUpdateTaskModal } from "../../redux/slices-global";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

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

type SetStateType = (data: DataType[]) => void;

export default function UpdateModal() {
	// Api url
	const apiUrl = "https://autoapi.dezinfeksiyatashkent.uz/api";

	// Redux
	const dispatch: AppDispatch = useDispatch();

	// Use context
	const { setData, itemId, refetchData } = useGlobalContext();

	// New states
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
	const [seconds, setSeconds] = useState("");
	const [transmission, setTransmission] = useState("");
	const [year, setYear] = useState("");

	// New form data
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

	// Get last uploaded img
	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setNewImage(file);
		}
	};

	// Get last uploaded img
	const handleImageCover = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageCover(file);
		}
	};

	// Get last uploaded img
	const handleImageMain = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageMain(file);
		}
	};

	// Fetch main data
	const token = localStorage.getItem("loginToken");
	const updateCategoryItem = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch(`${apiUrl}/cars/${itemId}`, {
			method: "PUT",
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
					refetchData("cars");
				} else {
					toast.error(data.message);
				}
			});
	};

	// Fetch data value for selects
	const fetching = (whichOne: string, setState: SetStateType) => {
		fetch(`${apiUrl}/${whichOne}`)
			.then((response) => response.json())
			.then((data) => {
				setState(data.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		fetching("categories", setCategories);
		fetching("brands", setBrands);
		fetching("models", setModels);
		fetching("locations", setLocation);
		fetching("cities", setCities);
	}, []);

	// Toggle modal open or close
	const handleToggleModal = () => {
		dispatch(setCloseUpdateTaskModal());
	};

	return (
		<section>
			<div
				onClick={handleToggleModal}
				className="fixed top-0 left-0 z-[400] bg-black/50 w-full h-[100vh]"
			></div>
			<div
				className="p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[65vh] no-scrollbar overflow-y-auto 
			rounded-lg bg-white z-[500]"
			>
				<h2 className="font-semibold leading-none text-[20px]">
					Add new items to the database
				</h2>
				<form
					onSubmit={updateCategoryItem}
					className="flex flex-col space-y-4 mt-4"
				>
					<SelectComponent
						items={categories}
						setState={setCategoryValue}
						value={categoryValue}
						label="Category"
					/>
					<SelectComponent
						items={brands}
						setState={setBrandValue}
						value={brandValue}
						label="Brand"
					/>
					<SelectComponent
						items={models}
						setState={setModelValue}
						value={modelValue}
						label="Model"
					/>
					<SelectComponent
						items={location}
						setState={setLocationValue}
						value={locationValue}
						label="Location"
					/>
					<SelectComponent
						items={cities}
						setState={setCityValue}
						value={cityValue}
						label="City"
					/>

					<InputComponent setState={setColor} value={color} label="Color" />
					<InputComponent setState={setYear} value={year} label="Year" />
					<InputComponent
						setState={setSeconds}
						value={seconds}
						label="Seconds"
					/>
					<InputComponent
						setState={setMaxSpeed}
						value={maxSpeed}
						label="Speed"
					/>
					<InputComponent
						setState={setMaxPeople}
						value={maxPeople}
						label="Max People"
					/>
					<InputComponent setState={setMotor} value={motor} label="Motor" />
					<InputComponent
						setState={setTransmission}
						value={transmission}
						label="Transmission"
					/>
					<InputComponent
						setState={setDriveSide}
						value={driveSide}
						label="Drive Side"
					/>
					<InputComponent setState={setPetrol} value={petrol} label="Fuel" />
					<InputComponent
						setState={setLimitPerDay}
						value={limitPerDay}
						label="Limit Per Day"
					/>
					<InputComponent
						setState={setDeposit}
						value={deposit}
						label="Deposit"
					/>
					<InputComponent
						setState={setPremiumProtection}
						value={premiumProtection}
						label="Premium
							Protection Price"
					/>
					<InputComponent
						setState={setPriceInAed}
						value={priceInAed}
						label="Price in AED"
					/>
					<InputComponent
						setState={setPriceInUsdSale}
						value={priceInUsdSale}
						label="Price in
							USD (Otd)"
					/>
					<InputComponent
						setState={setPriceInAedSale}
						value={priceInAedSale}
						label="Price in AED
							(Otd)"
					/>
					<InputComponent
						setState={setPriceInUsd}
						value={priceInUsd}
						label="Price in USD"
					/>

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

					<ImgUploadComponent
						handleUploadImage={handleImageChange}
						label="Upload car
							images"
					/>
					<ImgUploadComponent
						handleUploadImage={handleImageMain}
						label="Upload the
							main image"
					/>
					<ImgUploadComponent
						handleUploadImage={handleImageCover}
						label="Upload the
							cover image"
					/>

					{/* Cancel Or Update Buttons */}
					<ModalButtons
						handleToggleModal={handleToggleModal}
						btntext="Update"
					/>
				</form>
			</div>
		</section>
	);
}
