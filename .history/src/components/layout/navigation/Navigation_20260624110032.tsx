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
										<ul className="flex flex-col">
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
	)
}
