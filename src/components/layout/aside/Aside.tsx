'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa6'
import clsx from 'clsx'

import { useQuery } from '@tanstack/react-query'
import { CategoryService } from '@/services/category/category.service'

import styles from './Aside.module.scss'

import Logo from '@/assets/images/Logo.svg'


const menuAnimation = {
	open: {
		opacity: 1,
		transition: {
			duration: 0.4
		},
		height: 'auto'
	},
	close: {
		opacity: 0,
		transition: {
			duration: 0.4
		},
		height: 0
	}
}

export default function Aside() {
	const [openId, setOpenId] = useState<number | null>(null)

	const router = useRouter()

	const { isLoading, data: categories } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
			select: ({ data }) => data
		}
	)

	const openSubcategory = (id: number) => {
		openId === id ? setOpenId(null) : setOpenId(id)
	}

	return (
		<aside className={styles.aside}>
			<div className={styles.aside__container}>
				<div className={styles.aside__header}>
					<Image src={Logo} alt="магазин цветов Your Flowers" width={50} />
					<div className="flex flex-col">
						<Link href="/" className={styles.aside__logo}>
							твои цветы
						</Link>
						<a href="tel:+79914646016" className={styles.phone}>
							+7 (991) 464 60-16
						</a>
					</div>
				</div>

				<div className={styles.category}>
					{categories &&
						categories.map(({ id, name, slug, icon, subCategories }) => (
							<div key={id} className={styles.category__container}>
								<div
									className={styles.category__details}
									onClick={() =>
										subCategories.length > 0
											? openSubcategory(id)
											: router.push(`/category/${slug}`)
									}
								>
									<span
										title={name}
										className={clsx(
											styles.category__title,
											openId === id && styles.title__active
										)}
									>
										{name}
									</span>
									<motion.div
										transition={{
											ease: 'linear',
											duration: 0.3
										}}
										animate={{
											rotate: openId === id ? 180 : 0
										}}
									>
										<FaChevronDown
											color={openId === id ? 'var(--purple)' : 'black'}
										/>
									</motion.div>
								</div>

								<AnimatePresence>
									{subCategories.length > 0 && openId === id && (
										<motion.div
											variants={menuAnimation}
											initial="close"
											animate="open"
											className={styles.category__child}
										>
											{subCategories
												.sort((a, b) => a.id - b.id)
												.map(sub => (
													<Link
														href={`/category/${sub.slug}`}
														className={styles.category__link}
													>
														<div className={styles.category__img}>
															<div className={styles.category__img__container}>
																<Image src={sub.icon} alt={sub.slug} fill />
															</div>
														</div>
														<span
															title={sub.name}
															className={styles.category__title}
														>
															{sub.name}
														</span>
													</Link>
												))}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						))}
				</div>
			</div>
		</aside>
	)
}
