import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import rootReducer from './slices'

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: true })],
    devTools: process.env.NODE_ENV !== 'production',
  })

export const store = createStore()
