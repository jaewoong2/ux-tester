import { Providers } from '@/lib/Provider'
import './globals.css'
import Layout from './components/Layout'
import { Metadata } from 'next'
import { METADATA } from '@/constants'

export const metadata: Metadata = {
  ...METADATA,
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang='kr'>
      <body suppressHydrationWarning={true} className='relative bg-slate-200'>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
