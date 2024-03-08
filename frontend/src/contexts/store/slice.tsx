import { AUTH_BASE_URL, SOUNDTRACK_URL } from '@/utils/constant'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// this component is the base endpoint through which all other end points are called
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // THIS IS THE BASE ENDPOINT COMING FROM THE CONFIG FILE
    baseUrl: AUTH_BASE_URL,
    // This function takes in headers
    prepareHeaders: (headers, {}) => {
      const token = window.localStorage.getItem('accessToken') ?? 'TOKEN-NOT-FOUND'
      const refreshToken = window.localStorage.getItem('refreshToken') ?? 'TOKEN-NOT-FOUND'
      headers.set('authorization', `Bearer ${token ? token : 'token not found'}`)
      headers.set('x-refresh-token', `${refreshToken ? refreshToken : 'token not found'}`)
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
})

export const soundtrackApi = createApi({
  reducerPath: 'soundtrackApi',
  baseQuery: fetchBaseQuery({
    // THIS IS THE BASE ENDPOINT COMING FROM THE CONFIG FILE
    baseUrl: SOUNDTRACK_URL,
    // This function takes in headers
    prepareHeaders: (headers, {}) => {
      const token = window.localStorage.getItem('accessToken') ?? 'TOKEN-NOT-FOUND'
      const refreshToken = window.localStorage.getItem('refreshToken') ?? 'TOKEN-NOT-FOUND'
      headers.set('authorization', `Bearer ${token ? token : 'token not found'}`)
      headers.set('x-refresh-token', `${refreshToken ? refreshToken : 'token not found'}`)
      return headers
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
})
