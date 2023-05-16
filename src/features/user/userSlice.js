
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
            query: () => "user/wishlist"
        }),

        getUserAddToCart: buider.query({
            query: () => "user/cart",
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
                return {
                    url: "user/cart",
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
                    method: "POST",
                    body: body
                }
            }
        }),

        getUserOrders: buider.query({
            query: () => `user/getmyorders`

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
            query: () => `user/profile`,
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

                }
            }

        }),

        updateAvatar: buider.mutation({
            query: (data) => {
                return {
                    url: `user/avatar`,
                    method: "POST",
                    body: data,

                }
            },
            invalidatesTags: (result, error, body) => [{ type: 'profileUser', id: 'User' }]
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
    useForgotPasswordResetMutation,
    useForgotPasswordMutation,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useDeleteUserAddToCartMutation,
    useUpdateQuantityUserAddToCartMutation
} = userApi;
