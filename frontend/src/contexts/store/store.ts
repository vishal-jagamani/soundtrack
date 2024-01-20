import { configureStore } from '@reduxjs/toolkit'
import { soundtrackApi } from './slice'
import soundtrack from '../reducers/soundtrack'

export const store = configureStore({
  reducer: {
    // reducer for slice goes here
    assetVersionControl: soundtrack,
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
