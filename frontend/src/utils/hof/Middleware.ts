// middleware.ts
import { Middleware } from '@reduxjs/toolkit'
// import { useLocalStorage } from '../customHooks/useLocalStorage'

export const authMiddleware: Middleware = () => next => async action => {
  const result = next(action)
  const HEADER_DATA = action?.meta?.baseQueryMeta?.response
  const REFRESH_TOKEN = HEADER_DATA?.headers?.get('X-Refresh-Token')
  const ACCESS_TOKEN = HEADER_DATA?.headers?.get('X-Refresh-Token')
  // Check if the action is a fulfilled action from RTK Query
  if (REFRESH_TOKEN && ACCESS_TOKEN) {
    // const [, setRefreshToken] = useLocalStorage('refreshToken')
    // const [, setAccessToken] = useLocalStorage('accessToken')
    // setRefreshToken(REFRESH_TOKEN)
    // setAccessToken(ACCESS_TOKEN)
    // Dispatch the setAccessToken thunk to update the local storage
    window.localStorage.setItem('accessToken', ACCESS_TOKEN)
    window.localStorage.setItem('refreshToken', REFRESH_TOKEN)
  }
  return result
}
