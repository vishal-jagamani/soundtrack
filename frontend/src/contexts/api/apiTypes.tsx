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
}

export interface EmailVerifyPost {
  email: string
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