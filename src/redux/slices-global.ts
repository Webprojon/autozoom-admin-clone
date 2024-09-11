import { createSlice } from "@reduxjs/toolkit";

export interface GlobalType {
	addTaskModal: boolean;
}

const initialState: GlobalType = {
	addTaskModal: false,
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setOpenAddTaskModal: (state) => {
			state.addTaskModal = true;
		},
		setCloseAddTaskModal: (state) => {
			state.addTaskModal = false;
		},
	},
});

export const { setOpenAddTaskModal, setCloseAddTaskModal } =
	globalSlice.actions;
