import React, { createContext, useState, ReactNode, useContext } from "react";

export interface GlobalContextType {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [itemId, setItemId] = useState<string>("");

	return (
		<GlobalContext.Provider
			value={{
				isModalOpen,
				setIsModalOpen,
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
