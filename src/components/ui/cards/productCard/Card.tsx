'use client'

import { MouseEvent, MouseEventHandler, memo } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa6'

import { useActions } from '@/hooks/useAction'

import { IProduct } from '@/types/product.interface'

import styles from './Card.module.scss'

const Card = memo(function Card(props: IProduct) {
	const { id, createdAt, name, slug, description, images, price, categoryId } =
		props

	const { addToCart } = useActions()

	const openProductCard = () => console.log('click on card')

	const handleAddToCart = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation()

		addToCart({ product: props, quantity: 1 })
	}

	return (
		<motion.div
			className={styles.card}
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ delay: 0.2, duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
			onClick={openProductCard}
		>
			<div className={styles.image}>
				<Image
					src={images[0]}
					alt={name}
					fill
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>

			<section className={styles.section}>
				<div className="pt-[6px]">
					<h2 className={styles.logo}>{name}</h2>
				</div>

				<div className={styles.section__price} onClick={handleAddToCart}>
					<div className={styles.price}>{price}</div>
					<div className={styles.basket}>
						<FaPlus size={18} color="var(--green)" />
					</div>
				</div>
			</section>
		</motion.div>
	)
})

export default Card
