'use client'

import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import SupabaseProvider from '../app/supabase-provider'
import { store } from '../store/store'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <Provider store={store}>
        <SWRConfig>
          <CacheProvider>
            <ChakraProvider resetCSS>{children}</ChakraProvider>
          </CacheProvider>
        </SWRConfig>
      </Provider>
    </SupabaseProvider>
  )
}
