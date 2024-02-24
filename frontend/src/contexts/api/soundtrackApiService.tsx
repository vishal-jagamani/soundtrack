import { soundtrackApi } from '../store/slice'
import { GetDataType } from './apiTypes'

export const soundtrackApiService = soundtrackApi.injectEndpoints({
  endpoints: builder => ({
    getRequest: builder.query<GetDataType, string>({
      query: getQuery => ({
        url: getQuery,
      }),
    }),
  }),
})
export const { useGetRequestQuery } = soundtrackApiService
