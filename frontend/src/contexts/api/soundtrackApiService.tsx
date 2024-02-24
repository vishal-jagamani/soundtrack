import { soundtrackApi } from '../store/slice'
import { GetDataType, SearchInputPost } from './apiTypes'

export const soundtrackApiService = soundtrackApi.injectEndpoints({
  endpoints: builder => ({
    getRequest: builder.query<GetDataType, string>({
      query: getQuery => ({
        url: getQuery,
      }),
    }),
    searchInput: builder.mutation<GetDataType, SearchInputPost>({
      query: payload => ({
        url: '/search',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})
export const { useGetRequestQuery, useSearchInputMutation } = soundtrackApiService
