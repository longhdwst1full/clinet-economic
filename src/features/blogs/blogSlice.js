import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../Hook/customBaseQuery";

 
export const blogApi = createApi({
    reducerPath: "blogs",
    baseQuery: customBaseQuery,
    endpoints: (buider) => ({
        getAllBlogs: buider.query({
            query: () => "blog",
        }),

        getOneBlog: buider.query({
            query: (id) => `blog/${id}`

        }),

        likeBlog: buider.mutation({
            query(id) {

                return {
                    url: "blog/likes",
                    method: "PUT",
                    body: { blogId: id },


                }
            },

        }),

        dislikesBlog: buider.mutation({
            query(id) {
                return {
                    url: "blog/dislikes",
                    method: "PUT",
                    body: { blogId: id },
                }
            },

        })
    })
})


export const { useLikeBlogMutation,
    useGetOneBlogQuery,
    useGetAllBlogsQuery,
    useDislikesBlogMutation } = blogApi;