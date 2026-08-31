'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import clsx from 'clsx'

import { useQuery } from '@tanstack/react-query'
import { ICategory } from '@/types/category.interface'
import { CategoryService } from '@/services/category/category.service'

import styles from './Navigation.module.scss'

export default function Navigation() {
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
	const [hoveredSubcategory, setHoveredSubcategory] = useState<Array<ICategory>>([]);

	const { data: categories } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
			select: (data) => data.sort((a, b) => a.order - b.order)
		}
	)

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
						{categories.map(({ id, name, subCategories }) => (
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
		</nav>
	)
}
