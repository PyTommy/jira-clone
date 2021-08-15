import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthService } from '../../services/authServices'

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await AuthService.register({ name, email, password })
    return response
  },
)
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await AuthService.login({ email, password })
    return response
  },
)
export const cookieLogin = createAsyncThunk('auth/cookieLogin', async () => {
  const response = await AuthService.cookieLogin()
  return response
})
