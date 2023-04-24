

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../features/user/userSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { productsApi } from "../features/products/productSlice"
import { blogApi } from "../features/blogs/blogSlice";


const middleware = getDefaultMiddleware()
    .concat(userApi.middleware,
        productsApi.middleware,
        blogApi.middleware);

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware,

})


setupListeners(store.dispatch)