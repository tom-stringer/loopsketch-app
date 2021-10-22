import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type NavState = {
    showMenu: boolean;
};

const initialState: NavState = {
    showMenu: false,
};

const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.showMenu = !state.showMenu;
        },
    },
});

export const { toggleMenu } = navSlice.actions;

export const selectShowMenu = (state: RootState) => state.nav.showMenu;

export default navSlice.reducer;
