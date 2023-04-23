

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { userApi } from "../features/user/userSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),

})


setupListeners(store.dispatch)