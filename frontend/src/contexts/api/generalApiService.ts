import { soundtrackApi } from '../store/slice'
import { EmailVerifyData, EmailVerifyPost, OtpVerifyPost } from './apiTypes'

export const generalApiService = soundtrackApi.injectEndpoints({
  endpoints: builder => ({
    getRequest: builder.query({
      query: getQuery => ({
        url: getQuery,
      }),
    }),

    checkEmailAddress: builder.mutation<EmailVerifyData, EmailVerifyPost>({
      query: payload => ({
        url: '/checkUserEmail',
        method: 'POST',
        body: payload,
      }),
    }),
    verifyOTP: builder.mutation<EmailVerifyData, OtpVerifyPost>({
      query: payload => ({
        url: '/verifyOTP',
        method: 'POST',
        body: payload,
      }),
    }),
    resendOTP: builder.mutation<EmailVerifyData, OtpVerifyPost>({
      query: payload => ({
        url: '/verifyOTP',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})
export const { useGetRequestQuery, useCheckEmailAddressMutation, useVerifyOTPMutation, useResendOTPMutation } = generalApiService
