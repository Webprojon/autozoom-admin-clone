import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
	setCloseAddTaskModal,
	setCloseUpdateTaskModal,
} from "../redux/slices-global";

export const useToggleModal = () => {
	const dispatch: AppDispatch = useDispatch();
	return () => {
		dispatch(setCloseAddTaskModal());
	};
};

export const useToggleUpdateModal = () => {
	const dispatch: AppDispatch = useDispatch();
	return () => {
		dispatch(setCloseUpdateTaskModal());
	};
};
