
import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../Hook/customBaseQuery";

export const LocalStorageEventTarget = new EventTarget()

export const getUserFromLS = () => localStorage.getItem("customer") ? JSON.parse(localStorage.getItem("customer")) : null
export const getTokenLs = getUserFromLS();
export const clearLSUser = () => {
    if (!localStorage.getItem('customer')) {
        return;
    }
    localStorage.removeItem("customer");
    const clearLSEvent = new Event('clearLS')
    return window.dispatchEvent(clearLSEvent);
}


export const userApi = createApi({
    reducerPath: "auth",
    baseQuery: customBaseQuery,


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
                        Authorization: `Bearer ${getTokenLs?.token}`,
                    },
                }
            },
        }),
        getUserAddToCart: buider.query({
            query() {
                return {
                    url: "user/cart",
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token}`,
                    }
                }
            },
            providesTags(result) {
                if (result && Array.isArray(result)) {

                    const final = [
                        ...result?.map((item) => {
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
        addToCart: buider.mutation({
            query(body) {
                const token = getUserFromLS()
                return {
                    url: "user/cart",
                    headers: {
                        Authorization: `Bearer ${token?.token}`,
                    },
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: (result, error, body) => [{ type: 'CartUser', id: 'LIST' }]
        }),



        deleteUserAddToCart: buider.mutation({
            query(cartItemId) {
                return {
                    url: `user/delete-product-cart`,
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token} `,
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
                        Authorization: `Bearer ${getTokenLs?.token} `,
                    },
                    method: "POST",
                    body: ""

                }
            },
            invalidatesTags: (result, error, id) => {
                return [{ type: 'CartUser', id: id.cartItemId }]
            }
        }),

        createOrderByUser: buider.mutation({
            query(body) {
                return {
                    url: `user/cart/create-order`,
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token} `,
                    },
                    method: "POST",
                    body: body

                }
            }

        }),

        getUserOrders: buider.query({
            query: () => {
                return {
                    url: `user/getmyorders`,
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token} `,
                    },
                    method: "GET",


                }
            }

        }),

        forgotPassword: buider.mutation({
            query: (data) => {
                return {
                    url: `user/forgot-password-token`,
                    method: "POST",
                    body: data
                }
            }

        }),

        forgotPasswordReset: buider.mutation({
            query: (data, token) => {
                return {
                    url: `user/reset-password/${token}`,
                    method: "POST",
                    body: data
                }
            }

        }),

        updatePassword: buider.mutation({
            query: (data) => {
                return {
                    url: `user/changepassword`,
                    method: "PUT",
                    body: data
                }
            }

        }),

        getProdfile: buider.query({
            query: () => {
                return {
                    url: `user/profile`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token} `,
                    },
                }
            },
            providesTags(result) {
                if (result && Array.isArray(result)) {

                    const final = [
                        ...result?.map((item) => {
                            return ({ type: 'profileUser', id: item._id })
                        }
                        ),
                        { type: 'profileUser', id: 'User' }
                    ]
                    return final
                }

                return [{ type: 'profileUser', id: 'User' }]
            }
        }),

        updateProfile: buider.mutation({
            query: (data) => {
                return {
                    url: `user/edit-user`,
                    method: "PUT",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token} `,
                    },
                }
            },
            invalidatesTags: (result, error, body) => [{ type: 'profileUser', id: 'User' }]

        }),

        saveUseraddress: buider.mutation({
            query: (data) => {
                return {
                    url: `user/save-address`,
                    method: "PUT",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token} `,
                    },
                }
            }

        }),

        updateAvatar: buider.mutation({
            query: (data) => {
                return {
                    url: `user/avatar`,
                    method: "POST",
                    body: data,
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token} `,
                    },
                }
            },
            invalidatesTags: (result, error, body) => [{ type: 'profileUser', id: 'User' }]
        }),
        refreshAccessToken: buider.query({
            query: () => ({
                url: `user/refresh/${getTokenLs.refreshToken}`,
                method: 'GET',
                // body: { refreshToken },
            }),
        }),
    }),

})

console.log(userApi)
export const { useGetUserProductsWithListQuery, useRegisterUserMutation,
    useGetUserAddToCartQuery,
    useGetProdfileQuery,
    useGetUserOrdersQuery,
    useCreateOrderByUserMutation,
    useAddToCartMutation,
    useLoginUserMutation,
    useUpdateAvatarMutation,
    useRefreshAccessTokenQuery,
    useForgotPasswordResetMutation,
    useForgotPasswordMutation,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useDeleteUserAddToCartMutation,
    useUpdateQuantityUserAddToCartMutation
} = userApi;
