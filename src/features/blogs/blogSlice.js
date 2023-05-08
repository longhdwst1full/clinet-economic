import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserFromLS } from "../user/userSlice";

const userLs= getUserFromLS();
const token = userLs?.token
export const blogApi = createApi({
    reducerPath: "blogs",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (buider) => ({
        getAllBlogs: buider.query({
            query: () => "blog",
        }),

        getOneBlog: buider.query({
            query: (id) => `blog/${id}`

        }),
        likeBlog: buider.mutation({
            query(id) {
                console.log(id)
                return {
                    url: "blog/likes",
                    method: "PUT",
                    body: { blogId: id },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }
            },

        }),
        dislikesBlog: buider.mutation({
            query(id) {
                console.log(id)
                return {
                    url: "blog/dislikes",
                    method: "PUT",
                    body: { blogId: id },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }
            },

        }),
    })
})

// console.log(blogApi)
export const { useLikeBlogMutation,
    useGetOneBlogQuery,
    useGetAllBlogsQuery,
    useDislikesBlogMutation } = blogApi;