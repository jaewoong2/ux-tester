import { SIGNUP_SELECTABLE_CARDS } from '@/db'
import { Item } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type Status = '순서' | '설정' | '완료'

interface SignupState {
  cards: Item[]
  selected: Item[]
  status: Status
  currentIndex: number
}

const initialState: SignupState = {
  cards: SIGNUP_SELECTABLE_CARDS,
  selected: [],
  status: '순서',
  currentIndex: 0,
}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    addSelected: (state, { payload }: PayloadAction<{ sourceIndex: number }>) => {
      state.selected = [...state.selected, state.cards[payload.sourceIndex]]
      state.cards = state.cards.filter((_, i) => i !== payload.sourceIndex)
    },
    swapSelected: (state, { payload }: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const temp = state.selected[payload.sourceIndex]
      state.selected[payload.sourceIndex] = state.selected[payload.destinationIndex]
      state.selected[payload.destinationIndex] = temp
    },
    setStatus: (state, { payload }: PayloadAction<{ status: Status }>) => {
      state.status = payload.status
    },
    nextCurrent: (state) => {
      if (state.currentIndex + 1 >= state.selected.length) {
        return
      }
      state.currentIndex = state.currentIndex + 1
    },

    prevCurrent: (state) => {
      if (state.currentIndex === 0) {
        return
      }
      state.currentIndex = state.currentIndex - 1
    },
  },
})

const { actions, reducer: signupReducer } = signupSlice

export const { addSelected, swapSelected, setStatus, nextCurrent, prevCurrent } = actions

export default signupReducer
