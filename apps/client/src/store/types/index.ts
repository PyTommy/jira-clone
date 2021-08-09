import { UserAttributes } from '@jira-clone/shared-types'

export interface AuthState {
  isAuthenticated: boolean
  loading: boolean
  user: UserAttributes
}

export interface RootState {
  authState: AuthState
}
