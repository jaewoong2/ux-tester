import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './slices/loginSlice'
import signupReducer from './slices/signupSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
