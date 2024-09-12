import { createSlice } from "@reduxjs/toolkit";

export interface GlobalType {
	addTaskModal: boolean;
	updateTaskModal: boolean;
}

const initialState: GlobalType = {
	addTaskModal: false,
	updateTaskModal: false,
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
		setOpenUpdateTaskModal: (state) => {
			state.updateTaskModal = true;
		},
		setCloseUpdateTaskModal: (state) => {
			state.updateTaskModal = false;
		},
	},
});

export const {
	setOpenAddTaskModal,
	setCloseAddTaskModal,
	setCloseUpdateTaskModal,
	setOpenUpdateTaskModal,
} = globalSlice.actions;
