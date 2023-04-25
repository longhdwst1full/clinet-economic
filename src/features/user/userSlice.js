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

        }),

        addToCart: buider.mutation({
            query(body) {
                return {
                    url: "user/cart",
                    headers: {
                        Authorization: `Bearer ${getUserFromLS?.token}`,
                    },
                    method: "POST",
                    body: body
                }
            }
        }),

        getUserAddToCart: buider.query({
            query() {
                return {
                    url: "user/cart",
                    headers: {
                        Authorization: `Bearer ${getUserFromLS?.token}`,
                    }
                }
            }
        })
    })
})

console.log(userApi)
export const { useGetUserProductsWithListQuery, useRegisterUserMutation,
    useGetUserAddToCartQuery,
    useAddToCartMutation,
    useLoginUserMutation } = userApi;