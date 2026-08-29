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
import { ICategory } from '@/types/category.interface'

// const menuAnimation = {
// 	open: {
// 		opacity: 1,
// 		transition: {
// 			duration: 0.4
// 		},
// 		height: 'auto'
// 	},
// 	close: {
// 		opacity: 0,
// 		transition: {
// 			duration: 0.4
// 		},
// 		height: 0
// 	}
// }

export default function Navigation() {
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const [hoveredSubcategory, setHoveredSubcategory] = useState<Array<ICategory>>([]);

	const router = useRouter()

	const { isLoading, data: categories } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
			select: ({ data }) => data.sort((a, b) => a.order - b.order)
		}
	)

	// const openSubcategory = (id: number) => {
	// 	openId === id ? setOpenId(null) : setOpenId(id)
	// }

	function setSubcategory(subCategories: Array<ICategory>): void {
		setHoveredSubcategory(subCategories);
		setIsOpenMenu(true);
	}

	return (
		<nav
			className={styles.nav}
			onMouseLeave={() => setIsOpenMenu(false)}
		>
			<ul className={styles.nav__list} >
				{categories ? (
					<div className={styles.nav__categories}>
						{categories.map(({ id, name, slug, icon, subCategories }) => (
							<li
								key={id}
								className={styles.nav__item}
								onMouseEnter={() => setSubcategory(subCategories)}
							>
								<span>{name}</span>
							</li>
						))}
					</div>
				) : null}

				<div
					className={styles.nav__pages}
					onMouseEnter={() => setIsOpenMenu(false)}
				>
					<li className={styles.nav__item}>
						<Link href="/subscription">
							<span>Подписка</span>
						</Link>
					</li>
					<li className={styles.nav__item}>
						<Link href="/delivery">
							<span>Доставка</span>
						</Link>
					</li>
					<li className={styles.nav__item}>
						<span>Корзина</span>
					</li>
				</div>
			</ul>

			<div
				onMouseEnter={() => setIsOpenMenu(true)}
				onMouseLeave={() => setIsOpenMenu(false)}
				className={clsx(styles.nav__menu, isOpenMenu && styles.nav__menuVisible)}
			>
				{/* <h2>Категории</h2> */}

				<ul>
					{hoveredSubcategory.map((item: ICategory) => (
						<li key={item.id} className={styles.nav__subcategory_item}>
							<Link href={`/category/${item.slug}`}>
								<span>{item.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
			{/* {categories ? (
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
			) : null} */}
		</nav>
	)
}
