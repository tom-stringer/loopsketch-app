import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { ResponseBody } from "../../../../interface/src/types/response-types";
import { UserResponseData } from "../../../../interface/src/types/user-types";

const userQueries = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/api/users" }),
    reducerPath: "userQuery",
    endpoints: (build) => ({
        getUser: build.query<ResponseBody<UserResponseData>, number>({
            query: (id) => ({ url: `/${id}` }),
        }),
    }),
});

// Auto-generated hooks.
export const { useGetUserQuery } = userQueries;

export default userQueries;
