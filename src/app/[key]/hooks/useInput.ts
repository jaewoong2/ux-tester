import { ChangeEventHandler, useState } from 'react'

function useInput<T extends HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>(initialValue = '') {
  const [state, setState] = useState(initialValue)

  const onChangeState: ChangeEventHandler<T> = (e) => {
    setState(e.target.value)
  }

  return [state, setState, onChangeState] as const
}

export default useInput
