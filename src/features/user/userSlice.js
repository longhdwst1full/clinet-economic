import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (buider) => ({
        registerUser: buider.mutation({
            query(body) {
                return {
                    url: "user/register",
                    method: "POST",
                    body: body
                }
            },

        }),

        loginUser: buider.mutation({
            query(body) {
                return {
                    url: "user/login",
                    method: "POST",
                    body: body
                }
            },

        })
    })
})

console.log(userApi)
export const { useRegisterUserMutation, useLoginUserMutation } = userApi;