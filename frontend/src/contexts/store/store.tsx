import { configureStore } from '@reduxjs/toolkit'
import { soundtrackApi } from './slice'
import soundtrack from '../reducers/soundtrack'
import authSlice from '../../pages/auth/slice/authSlice'

export const store = configureStore({
  reducer: {
    // reducer for slice goes here
    generalData: soundtrack,
    authData: authSlice,
    [soundtrackApi.reducerPath]: soundtrackApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }).concat([soundtrackApi.middleware]),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export default store
