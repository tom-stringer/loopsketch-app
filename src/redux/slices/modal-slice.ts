import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum Modals {
    NONE,
    LOG_IN,
    REGISTER,
    ADD_INSTRUMENT,
    ADD_BARS,
    SAVE_LOOP,
}

type ModalState = {
    current: Modals;
};

const initialState: ModalState = {
    current: Modals.NONE,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        hideModal: (state) => {
            state.current = Modals.NONE;
        },
        showModal: (state, action: PayloadAction<Modals>) => {
            state.current = action.payload;
        },
    },
});

export const { hideModal, showModal } = modalSlice.actions;

export const selectCurrentModal = (state: RootState) => state.modal.current;

export default modalSlice.reducer;
