import { createSlice } from '@reduxjs/toolkit'

interface LoginState {
  value: number
}

const initialState: LoginState = {
  value: 23,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

const { actions, reducer: loginReducer } = loginSlice

export const { increment, decrement } = actions

export default loginReducer
