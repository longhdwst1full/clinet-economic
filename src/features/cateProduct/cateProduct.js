import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
 
export const productCateApi = createApi({
    reducerPath: "productCate",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (buider) => ({
        getAllProductCates: buider.query({
            query: () => "productcategory",
        }),

        getOneProductCate: buider.query({
            query: (id) => `productcategory/${id}`

        }),
       
    
    })
})

// console.log(productcategoryApi)
export const {  
    useGetOneProductCateQuery,
    useGetAllProductCatesQuery,
      } = productCateApi;