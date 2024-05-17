'use client'

import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaCircleUser } from 'react-icons/fa6'

import { useQuery } from '@tanstack/react-query'
import { CategoryService } from '@/services/category/category.service'

import styles from './Navigation.module.scss'

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

export default function Navigation() {
	const [openId, setOpenId] = useState<number | null>(null)

	const router = useRouter()

	const { isLoading, data: categories } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
			select: ({ data }) => data.sort((a, b) => a.order - b.order)
		}
	)

	const openSubcategory = (id: number) => {
		openId === id ? setOpenId(null) : setOpenId(id)
	}

	return (
		<nav className={styles.navigation}>
			{categories ? (
				<ul className={styles.navigation__list}>
					{categories.map(({ id, name, slug, icon, subCategories }) => (
						<Fragment key={id}>
							{subCategories.length > 0 ? (
								<li
									className={styles.navigation__item}
									onMouseEnter={() => setOpenId(id)}
									onMouseLeave={() => setOpenId(null)}
								>
									<div className={styles.navigation__container}>
										<span>{name}</span>
										<FaChevronDown
											size={15}
											className={styles.navigation__arrow}
										/>
									</div>

									<div
										className={clsx(
											styles.tooltip,
											openId === id && styles.tooltip__open
										)}
									>
										<ul className="flex flex-col gap-2">
											{subCategories.map(subcategory => (
												<li
													key={subcategory.id}
													className={styles.navigation__item}
												>
													<div className={styles.navigation__container}>
														<Link href={`/category/${subcategory.slug}`}>
															<span>{subcategory.name}</span>
														</Link>
													</div>
												</li>
											))}
										</ul>
									</div>
								</li>
							) : (
								<li key={id} className={styles.navigation__item}>
									<div className={styles.navigation__container}>
										<Link href={`/category/${slug}`}>
											<span>{name}</span>
										</Link>
									</div>
								</li>
							)}
						</Fragment>
					))}
					<li className={styles.navigation__item}>
						<Link href="/subscription">
							<span>Подписка</span>
						</Link>
					</li>
					<li className={styles.navigation__item}>
						<Link href="/delivery">
							<span>Доставка</span>
						</Link>
					</li>
				</ul>
			) : null}
		</nav>
		// <aside className={styles.aside}>
		// 	<div className={styles.aside__container}>

		// 		<div className={styles.category}>
		// {categories ? (
		// 	<>
		// 		{categories
		// 			.filter(({ slug }) => slug === '8-marta')
		// 			.map(({ id, name, slug, icon, subCategories }) => (
		// 				<div key={id} className={styles.category__container}>
		// 					<div
		// 						className={styles.category__details}
		// 						onClick={() =>
		// 							subCategories.length > 0
		// 								? openSubcategory(id)
		// 								: router.push(`/category/${slug}`)
		// 						}
		// 					>
		// 						<span
		// 							title={name}
		// 							className={clsx(
		// 								styles.category__title,
		// 								openId === id && styles.title__active
		// 							)}
		// 						>
		// 							{name}
		// 						</span>
		// <motion.div
		// 	transition={{
		// 		ease: 'linear',
		// 		duration: 0.3
		// 	}}
		// 	animate={{
		// 		rotate: openId === id ? 180 : 0
		// 	}}
		// >
		// 	<FaChevronDown
		// 		color={openId === id ? 'var(--purple)' : 'black'}
		// 	/>
		// </motion.div>
		// 					</div>

		// 					<AnimatePresence>
		// 						{subCategories.length > 0 && openId === id && (
		// 							<motion.div
		// 								variants={menuAnimation}
		// 								initial="close"
		// 								animate="open"
		// 								className={styles.category__child}
		// 							>
		// 								{subCategories
		// 									.sort((a, b) => a.id - b.id)
		// 									.map(sub => (
		// 										<Link
		// 											href={`/category/${sub.slug}`}
		// 											className={styles.category__link}
		// 										>
		// 											<div className={styles.category__img}>
		// 												<div
		// 													className={styles.category__img__container}
		// 												>
		// 													<Image src={sub.icon} alt={sub.slug} fill />
		// 												</div>
		// 											</div>
		// 											<span
		// 												title={sub.name}
		// 												className={styles.category__title}
		// 											>
		// 												{sub.name}
		// 											</span>
		// 										</Link>
		// 									))}
		// 							</motion.div>
		// 						)}
		// 					</AnimatePresence>
		// 				</div>
		// 			))}
		// 		{categories.filter(({ slug }) => slug !== '8-marta').map(({ id, name, slug, icon, subCategories }) => (
		// 			<div key={id} className={styles.category__container}>
		// 				<div
		// 					className={styles.category__details}
		// 					onClick={() =>
		// 						subCategories.length > 0
		// 							? openSubcategory(id)
		// 							: router.push(`/category/${slug}`)
		// 					}
		// 				>
		// 					<span
		// 						title={name}
		// 						className={clsx(
		// 							styles.category__title,
		// 							openId === id && styles.title__active
		// 						)}
		// 					>
		// 						{name}
		// 					</span>
		// 					<motion.div
		// 						transition={{
		// 							ease: 'linear',
		// 							duration: 0.3
		// 						}}
		// 						animate={{
		// 							rotate: openId === id ? 180 : 0
		// 						}}
		// 					>
		// 						<FaChevronDown
		// 							color={openId === id ? 'var(--purple)' : 'black'}
		// 						/>
		// 					</motion.div>
		// 				</div>

		// 				<AnimatePresence>
		// 					{subCategories.length > 0 && openId === id && (
		// 						<motion.div
		// 							variants={menuAnimation}
		// 							initial="close"
		// 							animate="open"
		// 							className={styles.category__child}
		// 						>
		// 							{subCategories
		// 								.sort((a, b) => a.id - b.id)
		// 								.map(sub => (
		// 									<Link
		// 										href={`/category/${sub.slug}`}
		// 										className={styles.category__link}
		// 									>
		// 										<div className={styles.category__img}>
		// 											<div
		// 												className={styles.category__img__container}
		// 											>
		// 												<Image src={sub.icon} alt={sub.slug} fill />
		// 											</div>
		// 										</div>
		// 										<span
		// 											title={sub.name}
		// 											className={styles.category__title}
		// 										>
		// 											{sub.name}
		// 										</span>
		// 									</Link>
		// 								))}
		// 						</motion.div>
		// 					)}
		// 				</AnimatePresence>
		// 			</div>
		// 		))}
		// 	</>
		// ) : null}
		// 		</div>
		// 	</div>
		// </aside>
	)
}
