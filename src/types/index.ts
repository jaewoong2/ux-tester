import { InputProps } from '@chakra-ui/react'

export type Item = {
  id: string
  content: {
    title: string
    description: string
  }
  form: {
    label: string
    type: InputProps['type']
    helper?: string
    options: { [key: string]: string }
  }
  options: {
    type: string
    title: string
    option: string
    values?: {
      value: string
      node: React.ReactNode
      key: string | number
    }[]
  }[]
}
