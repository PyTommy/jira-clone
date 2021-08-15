import { createSlice } from '@reduxjs/toolkit'
import { cookieLogin, login, register } from '../actionCreators'
import { AuthState } from '../types'

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  user: {
    id: '',
    name: '',
    email: '',
    createdAt: 0,
    updatedAt: 0,
    deleted: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = true
    },
    logoutSuccess: (state) => {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(register.rejected, (state, action) => {
      state = initialState
    })
    // Login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state = initialState
    })
    // Cookie Login
    builder.addCase(cookieLogin.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(cookieLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(cookieLogin.rejected, (state, action) => {
      state = initialState
    })
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
