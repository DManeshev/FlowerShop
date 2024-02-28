import type { PropsWithChildren } from 'react'

import Footer from '../footer/Footer'
import BasketMobileBtn from '@/components/ui/btn/basketMobileBtn/BasketMobileBtn'
import PageLayoutSearch from './PageLayoutSearch'
import PageLayoutNavigation from './PageLayoutNavigation'

import styles from './PageLayout.module.scss'

export default function PageLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className='main'>
			{/* <PageLayoutSearch /> */}

			<PageLayoutNavigation />

			<div className={styles.content}>
				{children}

				<BasketMobileBtn />
			</div>

			{/* footer */}
			<Footer />
		</main>
	)
}
