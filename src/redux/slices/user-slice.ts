import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import userQueries from "../queries/user-queries";
import { User } from "../../../../interface/src/types/user-types";

type UserState = {
    users: Record<number, User>;
};

const initialState: UserState = {
    users: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(userQueries.endpoints.getUser.matchFulfilled, (state, action) => {
            const { data } = action.payload.result;

            if (data) {
                state.users[data.user.id] = data.user;
            }
        });
    },
});

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
