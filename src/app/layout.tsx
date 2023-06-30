import { Metadata } from 'next'
import Layout from './components/Layout'
import { Providers } from '../lib/Provider'
import { METADATA } from '../constants'

import './globals.css'
import GoogleAnalytics from '@/lib/GoogleAnalytics'

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
          <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ''} />
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
