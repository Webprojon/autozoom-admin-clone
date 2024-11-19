import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
	setToggleAddModal,
	setToggleUpdateModal,
} from "../redux/slices-global";

export const useToggleModal = () => {
	const dispatch: AppDispatch = useDispatch();
	return () => {
		dispatch(setToggleAddModal());
	};
};

export const useToggleUpdateModal = () => {
	const dispatch: AppDispatch = useDispatch();
	return () => {
		dispatch(setToggleUpdateModal());
	};
};
