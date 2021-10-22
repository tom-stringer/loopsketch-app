import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";
import { ResponseBody } from "../../../../interface/src/types/response-types";
import { Loop, LoopListResponseData, LoopResponseData } from "../../../../interface/src/types/loop-types";
import LoopTransformer from "../../transformers/LoopTransformer";

const loopQueries = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "/api/loops" }),
    reducerPath: "loopQuery",
    endpoints: (build) => ({
        getLoop: build.query<ResponseBody<LoopResponseData>, number>({
            query: (id) => ({ url: `/${id}` }),
        }),
        getAllLoops: build.query<ResponseBody<LoopListResponseData>, void>({
            query: () => "/",
        }),
        getLoopsByUser: build.query<ResponseBody<LoopListResponseData>, number>({
            query: (userId) => ({ url: `/user/${userId}` }),
        }),
        createLoop: build.mutation<ResponseBody<LoopResponseData>, Loop>({
            query: (loop) => ({ url: `/`, method: "POST", body: LoopTransformer.toCreateLoopRequest(loop) }),
        }),
        updateLoop: build.mutation<ResponseBody<LoopResponseData>, Loop>({
            query: (loop) => ({ url: `/${loop.id}`, method: "PUT", body: LoopTransformer.toUpdateLoopRequest(loop) }),
        }),
    }),
});

// Auto-generated hooks.
export const {
    useGetLoopQuery,
    useGetAllLoopsQuery,
    useGetLoopsByUserQuery,
    useCreateLoopMutation,
    useUpdateLoopMutation,
} = loopQueries;

export default loopQueries;
