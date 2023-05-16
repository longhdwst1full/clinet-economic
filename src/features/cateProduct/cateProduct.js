import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../Hook/customBaseQuery";
 
 
export const productCateApi = createApi({
    reducerPath: "productCate",
    baseQuery: customBaseQuery,
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