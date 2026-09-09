import { headers } from 'next/headers'
import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren, ReactNode } from 'react'

import Providers from '@/providers/Providers'
import { SITE_NAME } from '@/constants/seo.constants'
import { getSiteUrl } from '@/config/url.config'
import { protectedRoutes } from '@/providers/auth-provider/protected-routes.data'

import Header from '@/components/layout/header/Header'
import Footer from '@/components/layout/footer/Footer'
import Checkout from '@/components/layout/checkout/Checkout'
import Navigation from '@/components/layout/navigation/Navigation'

import './theme.css'
import './global.scss'

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },

  metadataBase: new URL(getSiteUrl()),

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Твои цветы 21',
    description: 'Интернет-магазин Твои цветы 21',
    type: 'website',
    locale: 'ru_RU'
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}

interface ILayoutRoot extends PropsWithChildren<unknown> {
  children: ReactNode
}

export default async function RootLayout({ children }: ILayoutRoot) {
  const header = await headers()
  const pathname = header.get('x-invoke-path') || ''
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  return (
    <html lang="ru">
      <body>
        <Providers>
          {!isProtectedRoute ? (
            <div className="wrapper">
              <div className='desktop__view relative'>
                <Header />

                <Navigation />

                <main className='main'>
                  {children}
                </main>

                <Footer />

                <Checkout />
              </div>
            </div>
          ) : (
            <div className="wrapper dashboard">{children}</div>
          )}
        </Providers>
      </body>
    </html>
  )
}
