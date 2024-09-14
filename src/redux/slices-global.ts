import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalType {
	addTaskModal: boolean;
	updateTaskModal: boolean;
	itemId: string;
}

const initialState: GlobalType = {
	addTaskModal: false,
	updateTaskModal: false,
	itemId: "",
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
		setItemId: (state, actions: PayloadAction<string>) => {
			state.itemId = actions.payload;
		},
	},
});

export const {
	setOpenAddTaskModal,
	setCloseAddTaskModal,
	setCloseUpdateTaskModal,
	setOpenUpdateTaskModal,
	setItemId,
} = globalSlice.actions;
