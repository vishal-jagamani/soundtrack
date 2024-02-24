import { Middleware, configureStore } from '@reduxjs/toolkit'
import { authApi, soundtrackApi } from './slice'
import soundtrack from '../reducers/soundtrack'
import authSlice from '../../pages/auth/slice/authSlice'
import { authMiddleware } from '@/utils/hof/Middleware'

export const store = configureStore({
  reducer: {
    // reducer for slice goes here
    generalData: soundtrack,
    authData: authSlice,
    [soundtrackApi.reducerPath]: soundtrackApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }).concat([soundtrackApi.middleware, authApi.middleware, authMiddleware as Middleware]),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export default store
