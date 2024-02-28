'use client'

import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { IProduct } from '@/types/product.interface'

import styles from './Card.module.scss'

export const ProductCard = memo(function Card(props: IProduct) {
	const { id, createdAt, name, slug, description, images, price, categoryId } =
		props

	return (
		<Link href={`/product/${slug}`}>
			<motion.div
				className={styles.card}
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.2, duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
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
					<h2 className={styles.card__logo}>{name}</h2>
					<div className={styles.card__price}>
						<span>{price}</span>
						<span>&#8381; </span>
					</div>
				</section>
			</motion.div>
		</Link>
	)
})
