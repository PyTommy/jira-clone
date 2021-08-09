import { combineReducers, Reducer } from 'redux'
import { RootState } from '../types'

import authReducer from './auth.slices'
const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  authState: authReducer,
})

export default rootReducer
