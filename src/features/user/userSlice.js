import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const getUserFromLS = localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null

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

        }),

        getUserProductsWithList: buider.query({
            query() {
                return {
                    url: "user/wishlist",
                    headers: {
                        Authorization: `Bearer ${getUserFromLS?.token}`,
                    },
                }
            },
            providesTags: ['addToWishList']

        })
    })
})

// console.log(userApi)
export const { useGetUserProductsWithListQuery, useRegisterUserMutation, useLoginUserMutation } = userApi;