import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'

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

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<html lang="ru">
			<body>
				<Providers>
					<div className="desctop">
						<Aside />

						<PageLayout>{children}</PageLayout>
						
						<Basket />
					</div> 
				</Providers>
			</body>
		</html>
	)
}
