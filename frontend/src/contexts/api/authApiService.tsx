import { authApi } from '../store/slice'
import { EmailVerifyData, EmailVerifyPost, OtpVerifyPost, ResendOtpPost, UserLoginPost, UserPostData, UserSignUp } from './apiTypes'

export const authApiService = authApi.injectEndpoints({
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
    resendOTP: builder.mutation<EmailVerifyData, ResendOtpPost>({
      query: payload => ({
        url: '/resendOTP',
        method: 'POST',
        body: payload,
      }),
    }),
    userLogin: builder.mutation<EmailVerifyData, UserLoginPost>({
      query: payload => ({
        url: '/userLogin',
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
      // transformResponse: (response: EmailVerifyData, meta: any) => {
      //   const token = meta.response.headers.get('Authorization')
      //   // const token = meta
      //   const data = response
      //   return { data, token }
      // },
    }),
  }),
})
export const {
  useGetRequestQuery,
  useCheckEmailAddressMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useUserSignUpMutation,
  useUserLoginMutation,
} = authApiService
