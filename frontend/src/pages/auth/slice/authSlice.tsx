// src/redux/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  user: any | null
  isAuthenticated: boolean
}

export interface User {
  userId: number
  firstName?: string
  email?: string
  lastName?: string
  userExist: boolean
  otpVerificationMailSent: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = action.payload
      state.isAuthenticated = false
    },
    logout: state => {
      state.user = null
      state.isAuthenticated = false
    },
    storeTempData: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = false
    },
  },
})

export const { loginSuccess, loginFailure, logout, storeTempData } = authSlice.actions
export default authSlice.reducer
