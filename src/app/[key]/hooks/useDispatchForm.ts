import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { handleChangeFormValue, setIsError } from '../../../store/slices/signupSlice'

type Callback = (prev: string) => string
type ErrorCallback = (prev: { rule?: boolean | null; duplicate?: boolean | null }) => {
  rule?: boolean | null
  duplicate?: boolean | null
}

const useDispatchForm = (index: number) => {
  const { selected } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()
  const target = selected[index]

  const setFormValue = (value: Callback | string) => {
    if (typeof value === 'string') {
      dispatch(handleChangeFormValue({ index, value }))
    } else {
      dispatch(handleChangeFormValue({ index, value: value(target.currentValue) }))
    }
  }

  const setFormError = (value: ErrorCallback | { rule?: boolean | null; duplicate?: boolean | null }) => {
    if (typeof value === 'function') {
      dispatch(setIsError({ index, value: value(target.isError) }))
    } else {
      dispatch(setIsError({ index, value: value }))
    }
  }

  return [target.currentValue, setFormValue, target.isError, setFormError] as const
}

export default useDispatchForm
