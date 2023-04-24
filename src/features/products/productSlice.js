import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserFromLS } from "../user/userSlice";


const token = getUserFromLS?.token
export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (buider) => ({
        getAllProducts: buider.query({
            query: () => "product",
        }),

        getOneProduct: buider.query({
            query: (id) => `product/${id}`

        }),
        addToWishList: buider.mutation({
            query(id) {
                console.log(id)
                return {
                    url: "product/wishlist",
                    method: "PUT",
                    body: { prodId: id },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }
            },
            invalidatesTags: ['addToWishList']
        }),
    })
})

console.log(productsApi)
export const { useGetOneProductQuery, useAddToWishListMutation, useGetAllProductsQuery } = productsApi;