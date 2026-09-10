import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { FaPhone, FaLocationDot } from "react-icons/fa6";

import { SocialMedia } from '@/types';
import { listSocialMedia } from './header.constants';

import { Cart } from '../basket/Cart';
import { HeaderMenuBtn } from './HeaderMenuBtn';

import styles from './Header.module.scss';

import Logo from '@/assets/images/logo.webp';

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.label}>
				<Link href="/">
					<div className={styles.image}>
						<Image src={Logo} alt="магазин цветов ТВОИ ЦВЕТЫ 21" fill />
					</div>
				</Link>

				<div className={styles.label__info}>
					<Link href="/" className={styles.label__logo}>твои цветы</Link>
					<div className={styles.label__description}>Цветочный магазин</div>

					<div className={styles.social}>
						{listSocialMedia.map((item: SocialMedia) => (
							<Link
								key={item.link}
								href={item.link}
								target="_blank"
								className={styles.social__icon}
							>
								<Image
									src={item.imageLink}
									alt={item.alt}
									width={50}
								/>
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className={styles.header__container}>
				<FaPhone size={22} color='var(--main-color)' />
				<div className='flex flex-col'>
					<a href="tel:+79876663045" className={clsx(styles.text, styles.phone)}>
						+7 (987) 666 30-45
					</a>
					<a href="tel:+79914646016" className={clsx(styles.text, styles.phone)}>
						+7 (991) 464 60-16
					</a>
				</div>
			</div>

			<div className={clsx(styles.header__container, 'ml-auto')}>
				<FaLocationDot size={22} color='var(--main-color)' />
				<div className={clsx(styles.text, styles.map)}>г. Чебоксары, ул. Стартовая, 3</div>
			</div>

			<HeaderMenuBtn />

			<div className={styles.basket}>
				<Cart />
			</div>
		</header>
	)
}
