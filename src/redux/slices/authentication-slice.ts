import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import authenticationQueries from "../queries/authentication-queries";
import { User } from "../../../../interface/src/types/user-types";

type AuthenticationState = {
    currentUser?: User;
};

const initialState: AuthenticationState = {};

export const authenticationSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(authenticationQueries.endpoints.getAuthenticationStatus.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    state.currentUser = data.user;
                } else {
                    delete state.currentUser;
                }
            })
            .addMatcher(authenticationQueries.endpoints.login.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    state.currentUser = data.user;
                }
            })
            .addMatcher(authenticationQueries.endpoints.register.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    state.currentUser = data.user;
                }
            })
            .addMatcher(authenticationQueries.endpoints.logout.matchFulfilled, (state, action) => {
                const { error } = action.payload.result;

                console.log(error);

                if (!error) {
                    delete state.currentUser;
                }
            });
    },
});

export const selectCurrentUser = (state: RootState) => state.authentication.currentUser;

export default authenticationSlice.reducer;
