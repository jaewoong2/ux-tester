import { PrimaryItem } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type Status = '순서' | '설정' | '완료'

interface SignupState {
  cards: PrimaryItem[]
  selected: PrimaryItem[]
  status: Status
  currentIndex: number
}

const initialState: SignupState = {
  cards: [],
  selected: [],
  status: '순서',
  currentIndex: 0,
}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    init: (state, { payload }: PayloadAction<{ items: PrimaryItem[] }>) => {
      state.cards = payload.items
    },
    addSelected: (state, { payload }: PayloadAction<{ sourceIndex: number }>) => {
      state.selected = [...state.selected, state.cards[payload.sourceIndex]]
      state.cards = state.cards.filter((_, i) => i !== payload.sourceIndex)
    },
    swapSelected: (state, { payload }: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = payload

      if (
        sourceIndex < 0 ||
        sourceIndex >= state.selected.length ||
        destinationIndex < 0 ||
        destinationIndex >= state.selected.length ||
        sourceIndex === destinationIndex
      ) {
        // Invalid source or destination index, or same indices provided
        return
      }

      const nextSelected = [...state.selected]
      const [target] = nextSelected.splice(sourceIndex, 1)
      nextSelected.splice(destinationIndex, 0, target)

      state.selected = nextSelected
    },
    setStatus: (state, { payload }: PayloadAction<{ status: Status }>) => {
      state.status = payload.status
    },

    setCurrentIndex: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.currentIndex = payload.index
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
    // handleChangeOptions: (state, { payload }: PayloadAction<{ value: string; key: string }>) => {
    //   state.selected[state.currentIndex].form.options[payload.key] = payload.value
    // },
  },
})

const { actions, reducer: signupReducer } = signupSlice

export const { addSelected, swapSelected, setStatus, nextCurrent, prevCurrent, init, setCurrentIndex } = actions

export default signupReducer
