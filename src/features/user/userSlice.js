import { createAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import jwt from 'jsonwebtoken'


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
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
        prepareHeaders: (headers) => {

            const accessToken = getTokenLs?.token;
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
        onQueryStarted: async (request, { dispatch }) => {
            const accessToken = getTokenLs?.token;

            if (accessToken) {
                //   const refreshToken = getRefreshToken();

                //   try {
                //     const result = await dispatch(refreshToken());
                //     setAccessToken(result.payload.accessToken);
                //     setRefreshToken(result.payload.refreshToken);
                //   } catch (error) {
                //     console.error(error);
                //   }
            }
        },
        onQueryError: async (error, query, retries) => {
            const { statusCode } = error.response;

            if (statusCode === 401 || statusCode === 403) {
                //   const refreshToken = getRefreshToken();

                //   try {
                //     const result = await query.dispatch(refreshToken());
                //     // setAccessToken(result.payload.accessToken);
                //     // setRefreshToken(result.payload.refreshToken);
                //     console.log(result)
                //     // Retry the failed request with the updated access token
                //     return query.retry();
                //   } catch (error) {
                //     console.error(error);
                //   }
            }

            throw error;
        },
    }),
    // refetchOnFocus

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

        addToCart: buider.mutation({
            query(body) {
                return {
                    url: "user/cart",
                    headers: {
                        Authorization: `Bearer ${getTokenLs?.token}`,
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
                        Authorization: `Bearer ${getTokenLs?.token}`,
                    }
                }
            },
            providesTags(result) {

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

        })
    })
})

console.log(userApi)
export const { useGetUserProductsWithListQuery, useRegisterUserMutation,
    useGetUserAddToCartQuery,
    useGetUserOrdersQuery,
    useCreateOrderByUserMutation,
    useAddToCartMutation,
    useLoginUserMutation,
    useLogoutQuery,
    useDeleteUserAddToCartMutation,
    useUpdateQuantityUserAddToCartMutation
} = userApi;