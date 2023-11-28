import Providers from '@/providers/Providers'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { getSiteUrl } from '@/config/url.config'
import { SITE_NAME } from '@/constants/seo.constants'

import Aside from '@/components/layout/aside/Aside'
import Footer from '@/components/layout/footer/Footer'

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
						<main>{children}</main>
						<div className="w-[350px] flex-shrink">
							asda
							{/* ТУТ БУДЕТ КАРТА */}
							{/* <div className={styles.map}>
                        <Image
                          src={mapmark}
                          width={12}
                          height={24}
                          alt="Местоположение магазина Твои цветы"
                        />
                        г. Чебоксары, Чебоксарский пр-кт, 27
                      </div> */}
						</div>
						{/* <Footer /> */}
					</div>
				</Providers>
			</body>
		</html>
	)
}
