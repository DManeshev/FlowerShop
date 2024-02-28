import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import type { PropsWithChildren, ReactNode } from 'react'
import { headers } from 'next/dist/client/components/headers'

import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'
import { protectedRoutes } from '@/providers/auth-provider/protected-routes.data'

import Aside from '@/components/layout/aside/Aside'
import Basket from '@/components/layout/basket/Basket'
import PageLayout from '@/components/layout/pageLayout/PageLayout'

import './global.scss'

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	metadataBase: new URL(getSiteUrl())
	// openGraph: { }
}

interface ILayoutRoot extends PropsWithChildren<unknown> {
	children: ReactNode
	checkout: ReactNode
}

export default function RootLayout({ children, checkout }: ILayoutRoot) {
	const header = headers()
	const pathname = header.get('x-invoke-path') || ''
	const isProtectedRoute = protectedRoutes.some(route =>
		pathname.startsWith(route)
	)

	return (
		<html lang="ru">
			<body>
				<Providers>
					{!isProtectedRoute ? (
						<div className="desctop">
							<Aside />

							<PageLayout>{children}</PageLayout>

							<Basket />

							{checkout}
						</div>
					) : (
						<div className="desctop dashboard">{children}</div>
					)}
				</Providers>
			</body>
		</html>
	)
}
