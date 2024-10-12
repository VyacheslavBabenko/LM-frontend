import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TSideMenuState = {
	sideMenuOpened: boolean;
};

const initialState: TSideMenuState = {
	sideMenuOpened: false,
};

const appSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		toggleSideMenu(state) {
			state.sideMenuOpened = !state.sideMenuOpened;
		},
	},
});

export const { toggleSideMenu } = appSlice.actions;
export default appSlice.reducer;
