'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { LuFlower2, LuShoppingBag } from 'react-icons/lu'
import { memo, useEffect, useRef, useState } from 'react'

import { ICart } from '@/store'
import { IProduct } from '@/services'
import { useActions } from '@/hooks/useAction'
import { formatPrice } from '@/lib/utils'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading/Heading'

import styles from './Page.module.scss'
import clsx from 'clsx'

const MotionButton = motion.create(Button)

const Product = memo(function Product(props: IProduct) {
	const { id, name, description, price, images, flowers } = props;

	const [isFixed, setIsFixed] = useState(true);

	const actionsRef = useRef<HTMLDivElement>(null);

	const { addToCart } = useActions();
	const { cart } = useTypedSelector(state => state.cart);

	const inCart = cart.some((item: ICart) => item.product.id === id);
	const btnText = inCart
		? 'Букет уже в корзине'
		: `Добавить в корзину — ${formatPrice(price)}`;

	const handleAddToCart = () => addToCart({ product: props, quantity: 1 });

	useEffect(() => {
		const node = actionsRef.current;
		if (!node || typeof IntersectionObserver === 'undefined') return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsFixed(!entry.isIntersecting);
			},
			{ threshold: 0 }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	const imagesAfterBig: Array<string> = images.slice(1);

	return (
		<div className={styles.product}>
			<section className={styles.product__images}>
				{/* BIG IMAGE */}
				<div className={styles.bigImage}>
					<Image src={images[0]} alt={name} fill priority sizes="(max-width: 768px) 100vw, 55vw" />
				</div>

				{/* SMALL IMAGE */}
				{!!imagesAfterBig.length ?
					<div className={styles.smallImages}>
						{images.slice(1).map((image, index) => (
							<div key={index} className={styles.smallImages__img}>
								<Image src={image} alt={name} fill quality={100} />
							</div>
						))}
					</div>
					: null
				}
			</section>

			<section className={styles.details}>
				<header className={styles.details__header}>
					<Heading title={name} className={styles.details__title} />
					<p className={styles.details__price}>{formatPrice(price)}</p>
				</header>

				{flowers?.length ? (
					<div className={styles.flowers}>
						<span className={styles.flowers__label}>Состав букета</span>
						<ul className={styles.flowers__list}>
							{flowers.map(item => (
								<li key={item.id} className={styles.flower}>
									<LuFlower2 size={16} aria-hidden />
									<span>{item.name}</span>
								</li>
							))}
						</ul>
					</div>
				) : null}

				{description ? (
					<div className={styles.description}>
						<p>{description}</p>
					</div>
				) : null}

				<div className={styles.actions} ref={actionsRef}>
					<MotionButton
						layout="position"
						transition={{ type: 'spring', stiffness: 320, damping: 30 }}
						variant="outline"
						size="xl"
						onClick={handleAddToCart}
						className={clsx(styles.actions__btn, isFixed && styles['actions__btn--fixed'])}
					>
						<LuShoppingBag size={20} aria-hidden />
						<span>{btnText}</span>
					</MotionButton>

					<p className={styles.actions__note}>
						Доставка по Чебоксарам и Новочебоксарску. Оформление заказа — в корзине.
					</p>
				</div>
			</section>
		</div>
	)
})

export default Product