import { configureStore } from "@reduxjs/toolkit";
import loopReducer from "./slices/loop-slice";
import modalReducer from "./slices/modal-slice";
import navReducer from "./slices/nav-slice";
import userReducer from "./slices/user-slice";
import authenticationReducer from "./slices/authentication-slice";
import loopQueries from "./queries/loop-queries";
import userQueries from "./queries/user-queries";
import authenticationQueries from "./queries/authentication-queries";

const store = configureStore({
    reducer: {
        nav: navReducer,
        modal: modalReducer,
        loop: loopReducer,
        user: userReducer,
        authentication: authenticationReducer,
        [loopQueries.reducerPath]: loopQueries.reducer,
        [userQueries.reducerPath]: userQueries.reducer,
        [authenticationQueries.reducerPath]: authenticationQueries.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(loopQueries.middleware)
            .concat(userQueries.middleware)
            .concat(authenticationQueries.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
