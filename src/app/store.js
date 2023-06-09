

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../features/user/userSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { productsApi } from "../features/products/productSlice"
import { blogApi } from "../features/blogs/blogSlice";
import { contactApi } from "../features/contact/contactSlice";
import { productCateApi } from "../features/cateProduct/cateProduct";


const middleware = getDefaultMiddleware()
    .concat(userApi.middleware,
        productsApi.middleware,
        blogApi.middleware,
        contactApi.middleware,
        productCateApi.middleware
    );

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [productCateApi.reducerPath]: productCateApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware,

})


setupListeners(store.dispatch)