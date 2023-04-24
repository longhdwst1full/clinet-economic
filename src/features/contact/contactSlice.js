import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 

 
export const contactApi = createApi({
    reducerPath: "contacts",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
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