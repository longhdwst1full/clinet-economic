import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { clearLSUser, getUserFromLS } from "../features/user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getUserFromLS();
    if (token) {
      headers.set("Authorization", `Bearer ${token.token}`);
    }
    return headers;
  },
});

export const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.data?.err?.message === "jwt expired") {
    console.log("sending refresh token");
    const getToken = getUserFromLS();
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      `user/refresh/${getToken.refreshToken}`,
      api,
      extraOptions
    );

    // console.log("refreshResult ", refreshResult);
    if (refreshResult && refreshResult.data && refreshResult.data.data) {
      const user = api.getState().auth;
      console.log("token res", refreshResult.data.data);
      localStorage.setItem(
        "customer",
        JSON.stringify({ ...getToken, token: refreshResult.data.data })
      );
      // console.log("user dfdf", user);
      // console.log("what is api", api);
      // store the new token
      // api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("logout");
      // api.dispatch(logOut())
      fetch("/logout").then((response) => {
        if (response.ok) {
          clearLSUser();
          // toast.success("Logout Success");
          // navigate("/login");
        }
      });
    }
  }

  return result;
};
