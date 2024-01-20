export interface EmailVerifyData {
  status: boolean
  userExist: boolean
  otpVerificationMailSent: boolean
  message: string
  userId: number
  data: object
}

export interface EmailVerifyPost {
  email: string
}

export interface OtpVerifyPost {
  userId: number
  otp: string
}
