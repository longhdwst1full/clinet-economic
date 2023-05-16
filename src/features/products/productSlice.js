import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../Hook/customBaseQuery";


export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: customBaseQuery,
    endpoints: (buider) => ({
        getAllProducts: buider.query({
            query: (queryconfi) => `product?${queryconfi}`

        }),

        getOneProduct: buider.query({
            query: (id) => `product/${id}`
        }),

        addToWishList: buider.mutation({
            query(id) {

                return {
                    url: "product/wishlist",
                    method: "PUT",
                    body: { prodId: id },
                }
            }
        }),

        addRatingProducts: buider.mutation({
            query(data) {

                return {
                    url: "product/rating",
                    method: "PUT",
                    body: data
                }
            }
        }),
    })
})

// console.log(productsApi)
export const { useGetOneProductQuery, useAddToWishListMutation, useGetAllProductsQuery } = productsApi;