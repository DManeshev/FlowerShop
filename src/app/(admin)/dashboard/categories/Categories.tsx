'use client'

import { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

import { CategoryService, ICategory } from '@/services'

import { Subcategories } from './components/Subcategories'

import styles from './styles.module.scss'

const formatIndex = (value: number) => String(value).padStart(2, '0')

export default function CategoriesPage() {
	const [activeCategory, setActiveCategory] = useState<number | null>(null)
	const [listSubcategories, setListSubcategories] = useState<Array<ICategory>>(
		[]
	)

	const { data: categories, isLoading, isError } = useQuery({
		queryKey: ['categories'],
		queryFn: () => CategoryService.getAll(),
	})

	const selectedCategory =
		categories?.find(item => item.id === activeCategory) ?? null

	useEffect(() => {
		if (!selectedCategory) return

		setListSubcategories(selectedCategory.subcategories)
	}, [categories])

	return (
		<div className={styles.page}>
			<h1 className={styles.title}>Категории</h1>

			<div className={styles.layout}>
				<aside className={styles.panel}>
					<div className={styles.panelHead}>
						<span className={styles.panelTitle}>Разделы</span>
					</div>

					<ul className={styles.list} aria-busy={isLoading}>
						{isLoading &&
							Array.from({ length: 5 }).map((_, index) => (
								<li
									key={index}
									className={styles.skeleton}
									aria-hidden="true"
								/>
							))}

						{categories?.map(item => {
							const isActive = activeCategory === item.id

							return (
								<li key={item.id}>
									<button
										type="button"
										aria-pressed={isActive}
										onClick={() => {
											setActiveCategory(item.id)
											setListSubcategories(item.subcategories)
										}}
										className={clsx(styles.item, isActive && styles.itemActive)}
									>
										<span className={styles.itemIndex}>
											{formatIndex(item.order)}
										</span>
										<span className={styles.itemName} title={item.name}>
											{item.name}
										</span>
										<span className={styles.itemCount}>
											{item.subcategories.length}
										</span>
									</button>
								</li>
							)
						})}
					</ul>
				</aside>

				<Subcategories
					category={selectedCategory}
					subcategories={listSubcategories}
					isLoading={isLoading}
					isError={isError}
				/>
			</div>
		</div>
	)
}
