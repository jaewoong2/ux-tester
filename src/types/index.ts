import { InputProps } from '@chakra-ui/react'
import { Database } from './supabase'

type DbItem = Database['public']['Tables']['item']['Row']

export type PrimaryItem = DbItem

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
    rules?: { label: string; validator?: (input: string, rest: any) => boolean }[]
    options: { [key: string]: string }
  }
  options?: {
    type: string
    title: string
    option: string
    value: string
    placeholder?: string
    values?: {
      value: string
      node: string
      key: string | number
    }[]
  }[]
}
