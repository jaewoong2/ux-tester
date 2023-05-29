// app/providers.tsx
'use client'

import { store } from '@/store/store'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SWRConfig>
        <CacheProvider>
          <ChakraProvider resetCSS>{children}</ChakraProvider>
        </CacheProvider>
      </SWRConfig>
    </Provider>
  )
}