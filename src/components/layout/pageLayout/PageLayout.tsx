import type { PropsWithChildren } from 'react'

import Footer from '../footer/Footer'
import BasketMobileBtn from '@/components/ui/btn/basketMobileBtn/BasketMobileBtn'
import PageLayoutSearch from './PageLayoutSearch'
import PageLayoutNavigation from './PageLayoutNavigation'

import styles from './PageLayout.module.scss'

export default function PageLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className='main'>
			{/* search */}
			<PageLayoutSearch />

			{/* main */}
			<div className={styles.content}>
				{/* breadcrumbs */}
				<PageLayoutNavigation />

				{children}

				<BasketMobileBtn />
			</div>

			{/* footer */}
			<Footer />
		</main>
	)
}
