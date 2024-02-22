import { soundtrackApi } from '../store/slice'
import { EmailVerifyData, EmailVerifyPost, OtpVerifyPost, UserPostData, UserSignUp } from './apiTypes'

export const backupApiService = soundtrackApi.injectEndpoints({
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
    userSignUp: builder.mutation<UserSignUp, UserPostData>({
      query: payload => ({
        url: '/userSignup',
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: EmailVerifyData, meta: any) => {
        const token = meta.response.headers.get('Authorization')
        // const token = meta
        const data = response
        return { data, token }
      },
    }),
  }),
})
export const { useGetRequestQuery, useCheckEmailAddressMutation, useVerifyOTPMutation, useResendOTPMutation, useUserSignUpMutation } =
  backupApiService
