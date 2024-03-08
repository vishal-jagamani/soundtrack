// middleware.ts
import { Middleware } from '@reduxjs/toolkit'

export const authMiddleware: Middleware = () => next => async action => {
  const result = next(action)
  const HEADER_DATA = action?.meta?.baseQueryMeta?.response
  const RESPONSE_STATUS_CODE = action?.meta?.baseQueryMeta?.response?.status
  const REFRESH_TOKEN = HEADER_DATA?.headers?.get('X-Refresh-Token')
  const ACCESS_TOKEN = HEADER_DATA?.headers?.get('authorization')
  // Check if the action is a fulfilled action from RTK Query

  if (RESPONSE_STATUS_CODE === 401) {
    window.location.href = '/sign-in'
    window.localStorage.clear()
  } else if (REFRESH_TOKEN && ACCESS_TOKEN) {
    // setRefreshToken(REFRESH_TOKEN)
    // setAccessToken(ACCESS_TOKEN)
    // Dispatch the setAccessToken thunk to update the local storage
    window.localStorage.setItem('accessToken', ACCESS_TOKEN?.split(' ')?.[1])
    window.localStorage.setItem('refreshToken', REFRESH_TOKEN)
  }
  return result
}
