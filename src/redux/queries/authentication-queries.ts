import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { ResponseBody } from "../../../../interface/src/types/response-types";
import { UserResponseData } from "../../../../interface/src/types/user-types";
import { LoginRequest, RegisterRequest } from "../../../../interface/src/types/authentication-types";

const authenticationQueries = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/api/authentication" }),
    reducerPath: "authenticationQuery",
    endpoints: (build) => ({
        getAuthenticationStatus: build.query<ResponseBody<UserResponseData>, void>({
            query: () => ({ url: "/" }),
        }),
        login: build.mutation<ResponseBody<UserResponseData>, LoginRequest>({
            query: (loginRequest) => ({ url: "/login", method: "POST", body: loginRequest }),
        }),
        register: build.mutation<ResponseBody<UserResponseData>, RegisterRequest>({
            query: (registerRequest) => ({ url: "/register", method: "POST", body: registerRequest }),
        }),
        logout: build.mutation<ResponseBody<void>, void>({
            query: () => ({ url: "/logout" }),
        }),
    }),
});

// Auto-generated hooks.
export const {
    useGetAuthenticationStatusQuery,
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = authenticationQueries;

export default authenticationQueries;
