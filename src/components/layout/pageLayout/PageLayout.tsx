import type { PropsWithChildren } from 'react'

import Footer from '../footer/Footer'
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
			</div>

			{/* footer */}
			<Footer />
		</main>
	)
}
