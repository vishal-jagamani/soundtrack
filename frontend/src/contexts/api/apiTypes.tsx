import { User } from '@/pages/auth/slice/authSlice'

export interface EmailVerifyData {
  status: boolean
  userExist: boolean
  otpVerificationMailSent: boolean
  message: string
  userId: number
  data: User
}
export interface UserSignUp {
  token: any
  data: any
  status: boolean
}

export interface EmailVerifyPost {
  email: string
}

export interface ResendOtpPost {
  userId: number
}
export interface OtpVerifyPost {
  userId: number
  otp: string
}
export interface UserLoginPost {
  userId: number
  email: string
  password: string
}
export interface UserPostData {
  userId: number
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}
export interface GetDataType {
  data: any
  status: string
  message: string
}
export interface SearchInputPost {
  searchText: string
}
