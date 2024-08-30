import React, {
	createContext,
	useState,
	ReactNode,
	useContext,
	SetStateAction,
} from "react";

interface DataType {
	id: string;
	name_en: string;
	name_ru: string;
	image_src: SetStateAction<File | null>;
	title: string;
	name: string;
	brand_title: string;
	brand_id: string;
	text: string;
	category: {
		name_en: string;
	};
	model: {
		name: string;
	};
	color: string;
	city: {
		name: string;
	};
}

interface CarsDataType {
	id: string;
	category: {
		name_en: string;
	};
	model: {
		name: string;
	};
	color: string;
	city: {
		name: string;
	};
}

export interface GlobalContextType {
	addTaskModal: boolean;
	setAddtaskModal: React.Dispatch<React.SetStateAction<boolean>>;
	updateTaskModal: boolean;
	setUpdatetaskModal: React.Dispatch<React.SetStateAction<boolean>>;
	loader: boolean;
	setLoader: React.Dispatch<React.SetStateAction<boolean>>;
	itemId: string;
	setItemId: React.Dispatch<React.SetStateAction<string>>;
	data: DataType[];
	setData: React.Dispatch<React.SetStateAction<DataType[]>>;
	carsData: CarsDataType[];
	setCarsData: React.Dispatch<React.SetStateAction<CarsDataType[]>>;
	refetchData: (category: string) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
	children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalProviderProps> = ({
	children,
}) => {
	// New states
	const [addTaskModal, setAddtaskModal] = useState<boolean>(false);
	const [updateTaskModal, setUpdatetaskModal] = useState<boolean>(false);
	const [loader, setLoader] = useState<boolean>(true);
	const [itemId, setItemId] = useState<string>("");
	const [data, setData] = useState<DataType[]>([]);
	const [carsData, setCarsData] = useState<CarsDataType[]>([]);

	// Refetch data when new data added
	const refetchData = (category: string) => {
		fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/${category}`)
			.then((response) => response.json())
			.then((data) => {
				setData(data.data);
				setCarsData(data.data);
			})
			.catch((error) => console.error("Error fetching data:", error));
	};

	return (
		<GlobalContext.Provider
			value={{
				addTaskModal,
				setAddtaskModal,
				updateTaskModal,
				setUpdatetaskModal,
				loader,
				setLoader,
				itemId,
				setItemId,
				data,
				setData,
				carsData,
				setCarsData,
				refetchData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export function useGlobalContext() {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error(
			"useGlobalContext must be used within a GlobalContextProvider",
		);
	}
	return context;
}

export default GlobalContext;
