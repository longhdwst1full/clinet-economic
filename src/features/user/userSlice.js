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
            },
            invalidatesTags: (result, error, body) => [{ type: 'CartUser', id: 'LIST' }]
        }),

        getUserAddToCart: buider.query({
            query() {
                return {
                    url: "user/cart",
                    headers: {
                        Authorization: `Bearer ${getUserFromLS?.token}`,
                    }
                }
            },
            providesTags(result) {
                console.log("result", result);
                if (result) {

                    const final = [
                        ...result.map((item) => {

                            return ({ type: 'CartUser', id: item._id })
                        }
                        ),
                        { type: 'CartUser', id: 'LIST' }
                    ]
                    return final
                }

                return [{ type: 'CartUser', id: 'LIST' }]
            }
        }),

        deleteUserAddToCart: buider.mutation({
            query(cartItemId) {
                return {
                    url: `user/delete-product-cart`,
                    headers: {
                        Authorization: `Bearer ${getUserFromLS?.token} `,
                    },
                    body: {
                        cartItemId
                    },
                    method: "DELETE"

                }
            },
            invalidatesTags: (result, error, id) => {

                return [{ type: 'CartUser', id: id }]
            }
        }),

        updateQuantityUserAddToCart: buider.mutation({
            query({ cartItemId, newQuantity }) {
                return {
                    url: `user/update-product-cart/${cartItemId}/${newQuantity}`,
                    headers: {
                        Authorization: `Bearer ${getUserFromLS?.token} `,
                    },
                    method: "POST"

                }
            },
            invalidatesTags: (result, error, id) => {

                return [{ type: 'CartUser', id: id.cartItemId }]
            }
        })
    })
})

console.log(userApi)
export const { useGetUserProductsWithListQuery, useRegisterUserMutation,
    useGetUserAddToCartQuery,
    useAddToCartMutation,
    useLoginUserMutation, useDeleteUserAddToCartMutation,
    useUpdateQuantityUserAddToCartMutation
} = userApi;