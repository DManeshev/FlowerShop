import Link from 'next/link'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.info}>
				<Link href="/delivery" className={styles.info__link}>
					<span>Доставка</span>
				</Link>
			</div>

			<p className={styles.copyright}>&copy; Все права защищены</p>
		</footer>
	)
}

export default Footer
