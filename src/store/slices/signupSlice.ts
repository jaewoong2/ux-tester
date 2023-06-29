import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PrimaryItem } from '../../types'

type Status = '순서' | '설정' | '완료' | '결과'
type Item = PrimaryItem & {
  currentValue: string
  isError: {
    rule?: boolean | null
    duplicate?: boolean | null
  }
}

interface SignupState {
  nickname: string
  cards: Item[]
  selected: Item[]
  status: Status
  currentIndex: number
  optionsMap: {
    [key: string]: number
  }
}

const initialState: SignupState = {
  nickname: '',
  cards: [],
  selected: [],
  status: '순서',
  currentIndex: 0,
  optionsMap: {},
}

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    reset(state) {
      state.nickname = ''
      state.cards = []
      state.selected = []
      state.status = '순서'
      state.currentIndex = 0
      state.optionsMap = {}
    },

    init: (state, { payload }: PayloadAction<{ items: PrimaryItem[] }>) => {
      state.cards = payload.items.map((card) => {
        return {
          ...card,
          isError: { rule: null, duplicate: null },
          currentValue: '',
        }
      })
    },

    setNickName: (state, { payload }: PayloadAction<{ nickname: string }>) => {
      state.nickname = payload.nickname
    },

    setSelected: (state, { payload }: PayloadAction<{ selected: Item[] }>) => {
      state.selected = payload.selected
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
      if (payload.status !== '완료') {
        state.currentIndex = 0
        state.optionsMap = {}
        state.status = payload.status
        return
      }
      state.status = payload.status
    },

    setCurrentIndex: (state, { payload }: PayloadAction<{ index: number }>) => {
      state.currentIndex = payload.index
    },

    nextCurrent: (state) => {
      if (state.currentIndex + 1 >= state.selected.length) {
        state.currentIndex += 1
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

    setOptionsMap: (state, { payload }: PayloadAction<{ selectedIndex: number; optionIndex: number }>) => {
      state.optionsMap[payload.selectedIndex] = payload.optionIndex
    },

    setIsError: (state, { payload }: PayloadAction<{ index: number; value: Item['isError'] }>) => {
      if ('rule' in payload.value) {
        state.selected[payload.index].isError.rule = payload.value.rule
      }

      if ('duplicate' in payload.value) {
        state.selected[payload.index].isError.duplicate = payload.value.duplicate
      }
    },

    handleChangeFormValue: (state, { payload }: PayloadAction<{ index: number; value: string }>) => {
      state.selected[payload.index].currentValue = payload.value
    },

    handleChangeOptions: (state, { payload }: PayloadAction<{ value: string; key: string }>) => {
      const option = state.selected[state.currentIndex].optionValue
      if (option) {
        option[payload.key] = payload.value
      }
    },
  },
})

const { actions, reducer: signupReducer } = signupSlice

export const {
  handleChangeOptions,
  addSelected,
  swapSelected,
  handleChangeFormValue,
  setStatus,
  nextCurrent,
  prevCurrent,
  setSelected,
  init,
  setIsError,
  setCurrentIndex,
  setNickName,
  setOptionsMap,
  reset,
} = actions

export default signupReducer
