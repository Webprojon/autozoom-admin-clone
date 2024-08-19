import React, { createContext, useState, ReactNode, useContext } from "react";

export interface GlobalContextType {
	addTaskModal: boolean;
	setAddtaskModal: React.Dispatch<React.SetStateAction<boolean>>;
	updateTaskModal: boolean;
	setUpdatetaskModal: React.Dispatch<React.SetStateAction<boolean>>;
	loader: boolean;
	setLoader: React.Dispatch<React.SetStateAction<boolean>>;
	itemId: string;
	setItemId: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
	children: ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalProviderProps> = ({
	children,
}) => {
	const [addTaskModal, setAddtaskModal] = useState<boolean>(false);
	const [updateTaskModal, setUpdatetaskModal] = useState<boolean>(false);
	const [loader, setLoader] = useState<boolean>(true);
	const [itemId, setItemId] = useState<string>("");

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
