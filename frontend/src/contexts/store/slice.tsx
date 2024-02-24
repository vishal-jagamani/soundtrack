import { AUTH_BASE_URL, BASE_URL } from '@/utils/constant'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// this component is the base endpoint through which all other end points are called
export const soundtrackApi = createApi({
  reducerPath: 'soundtrackApi',
  baseQuery: fetchBaseQuery({
    // THIS IS THE BASE ENDPOINT COMING FROM THE CONFIG FILE
    baseUrl: BASE_URL,
    // This function takes in headers
    prepareHeaders: (headers, {}) => {
      const token = window.localStorage.getItem('accessToken') ?? 'TOKEN-NOT_FOUND'
      headers.set('authorization', `Bearer ${token ? token : 'token not found'}`)
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
})
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // THIS IS THE BASE ENDPOINT COMING FROM THE CONFIG FILE
    baseUrl: AUTH_BASE_URL,
    // This function takes in headers
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState()?.authDetails?.details?.data?.token ?? "ABCD-1234";
    //   headers.set("authorization", `Bearer ${token ? token : "token not found"}`);
    //   return headers;
    // },
  }),
  endpoints: () => ({}),
  tagTypes: [],
})
