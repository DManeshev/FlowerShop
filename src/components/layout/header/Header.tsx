import Image from 'next/image'
import Link from 'next/link'
import { FaAlignJustify } from 'react-icons/fa6'

import Logo from '@/assets/images/Logo.svg'
import whatsapp from '@/assets/images/whatsapp.png'
import telegram from '@/assets/images/telegram.png'
import vk from '@/assets/images/vk.png'

import styles from './Header.module.scss'

export default function Header() {
	return (
		<div className={styles.header}>
			<div className={styles.header__info}>
				<a href="tel:+79876663045" className={styles.phone}>
					+7 (987) 666 30-45
				</a>
				<div className={styles.phone}>Стартовая, 3</div>
			</div>

			<Link href="/" className={styles.header__label}>
				<div className={styles.image}>
					<Image src={Logo} alt="магазин цветов Your Flowers" fill />
				</div>
				<h2 className={styles.logo}>твои цветы</h2>
			</Link>

			<div className={styles.header__social}>
				<Link
					href="https://t.me/your_flowers_21"
					target="_blank"
					className={styles.icon}
				>
					<Image
						src={whatsapp}
						alt="Ссылка на whatsapp на канал магазина Твои цветы"
						width={50}
					/>
				</Link>
				<Link
					href="https://vk.com/your_flowers_21"
					target="_blank"
					className={styles.icon}
				>
					<Image
						src={telegram}
						alt="Ссылка на telegram на канал магазина Твои цветы"
						width={50}
					/>
				</Link>
				<Link
					href="https://wa.me/message/XVJACCEITBPIN1"
					target="_blank"
					className={styles.icon}
				>
					<Image
						src={vk}
						alt="Ссылка на VK группу магазина Твои цветы"
						width={50}
					/>
				</Link>
			</div>

			<div className={styles.header__hamburger}>
				<FaAlignJustify size={22} />
			</div>
		</div>
	)
}
