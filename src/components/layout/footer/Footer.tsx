import Link from 'next/link'

import { RiTelegramLine } from 'react-icons/ri'
import { SlSocialVkontakte } from 'react-icons/sl'
import { FaWhatsapp } from 'react-icons/fa'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.social}>
				<Link href="https://t.me/your_flowers_21" target="_blank" className={styles.social__icon}>
					<RiTelegramLine size={28} />
				</Link>
				<Link href="https://vk.com/your_flowers_21" target="_blank" className={styles.social__icon}>
					<SlSocialVkontakte size={28} />
				</Link>
				<Link href="https://wa.me/message/XVJACCEITBPIN1" target="_blank" className={styles.social__icon}>
					<FaWhatsapp size={25} />
				</Link>
			</div>

			<div className={styles.info}>
				<Link href="/contact" className={styles.info__link}>
					<span>Контакты</span>
				</Link>
				<Link href="/about" className={styles.info__link}>
					<span>О нас</span>
				</Link>
			</div>
            
            <p className={styles.copyright}>&copy; Все права защищены</p>
		</footer>
	)
}

export default Footer
