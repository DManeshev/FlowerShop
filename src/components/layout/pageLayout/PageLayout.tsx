import type { PropsWithChildren } from 'react'

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
			</div>

			{/* footer */}

		</main>
	)
}
