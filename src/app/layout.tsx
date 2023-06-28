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
    <html lang='kr' className='h-full overflow-scroll'>
      <body suppressHydrationWarning={true} className='relative max-h-full overflow-scroll bg-slate-200'>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
