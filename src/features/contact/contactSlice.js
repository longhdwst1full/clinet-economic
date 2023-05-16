import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../Hook/customBaseQuery";
 

 
export const contactApi = createApi({
    reducerPath: "contacts",
    baseQuery: customBaseQuery,
    endpoints: (buider) => ({
        createContactEnquiry: buider.mutation({
            query: (body) => {
                return {
                    url: "enquiry",
                    method: "POST",
                    body: body,
                }
            }
        }),


    })
})

console.log(contactApi)
export const { useCreateContactEnquiryMutation } = contactApi;