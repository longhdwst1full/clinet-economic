import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { getUserFromLS } from "../features/user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  
  prepareHeaders: (headers, { getState }) => {
    const token = getUserFromLS();
    if (token) {
       
      headers.set("Authorization", `Bearer ${token.token}`);
    }
    return headers;
  },
});

export const customBaseQuery = async (args, api, extraOptions) => {
  // try {
  //   return await baseQuery(args, api, extraOptions);
  // } catch (error) {
  //   // Handle 401 errors here
  //   console.log(error);
  //   console.log("list check ", args, api, extraOptions);
  //   if (error.status === 401) {
  //     const token = getUserFromLS();
  //     //   if (token && Date.now() < token.expiresIn) {
  //     if (token) {
  //       // Attempt to refresh the access token
  //       console.log("check token", token);
  //       // Attempt to refresh the access token
  //       return api.endpointDefinitions[0]
  //         .query({ refreshToken: token.refreshToken })
  //         .then((response) => {
  //           localStorage.setItem("customer", {
  //             ...response.data,
  //             token: response.data.token,
  //           });

  //           return baseQuery(args, api, extraOptions);
  //         });
  //     }
  //   }
  //   return Promise.reject(error);
  // }

  let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/user/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth
            console.log(user)
            // store the new token 
            // api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // // retry the original query with new access token 
            // result = await baseQuery(args, api, extraOptions)
        }
         else {
            // api.dispatch(logOut())
        }
    }

    return result
};

