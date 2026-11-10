import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren, ReactNode } from 'react'

import Providers from '@/providers/Providers'

import './theme.css'
import './global.scss'

export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_URL ?? 'https://yourflowers21.ru'),
	title: {
		default: 'Доставка цветов в Чебоксарах и Новочебоксарах — Твои цветы 21',
		template: '%s | Твои цветы 21'
	},
	description: 'Свежие цветы и букеты с доставкой по Чебоксарам, Новому Городу и Новочебоксарску. Букеты на заказ и доставка от 2500 ₽. Интернет-магазин «Твои цветы 21».',
	alternates: {
		canonical: '/'
	},
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: 'website',
		locale: 'ru_RU',
		siteName: 'Твои цветы 21',
		url: '/',
		images: [
			{ url: '/og/og-home.jpg', width: 1200, height: 630, alt: 'Твои цветы 21', }
		],
	},
	verification: {
		yandex: process.env.YANDEX_WEBMASTER,
		google: process.env.GOOGLE_GSC
	}
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1
}

interface ILayoutRoot extends PropsWithChildren<unknown> {
	children: ReactNode
}

export default function RootLayout({ children }: ILayoutRoot) {
	return (
		<html lang="ru">
			<body>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	)
}