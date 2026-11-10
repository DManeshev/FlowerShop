import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import { AuthPage } from './Auth'
import SubHeading from '@/components/ui/heading/SubHeading'

import styles from './Auth.module.scss'

export const metadata = {
	...NO_INDEX_PAGE,
	title: 'Вход | Твои цветы 21',
}

export default function Page() {
	return (
		<div className={styles.auth}>
			<div className="pb-4">
				<SubHeading title="Авторизация" />
			</div>

			<AuthPage />
		</div>
	)
}
