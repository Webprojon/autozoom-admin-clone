import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalType {
	toggleAddModal: boolean;
	toggleUpdateModal: boolean;
	itemId: string;
}

const initialState: GlobalType = {
	toggleAddModal: false,
	toggleUpdateModal: false,
	itemId: "",
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setToggleAddModal: (state) => {
			state.toggleAddModal = !state.toggleAddModal;
		},
		setToggleUpdateModal: (state) => {
			state.toggleUpdateModal = !state.toggleUpdateModal;
		},
		setItemId: (state, actions: PayloadAction<string>) => {
			state.itemId = actions.payload;
		},
	},
});

export const { setToggleAddModal, setToggleUpdateModal, setItemId } =
	globalSlice.actions;
