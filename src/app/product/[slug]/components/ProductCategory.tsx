'use client'

import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

import { CategoryService } from '@/services/category/category.service'

import styles from '../Page.module.scss'
import Link from 'next/link'

interface IProductCategory {
	categoryId: number
	subcategoryId: number
}

export default function ProductCategory({
	categoryId,
	subcategoryId
}: IProductCategory) {
	const { data: category } = useQuery(
		['get category'],
		() => CategoryService.getById(categoryId),
		{
			select: ({ data }) => data
		}
	)

	const { data: subcategory } = useQuery(
		['get subcategory'],
		() => CategoryService.getSubcategoryById(subcategoryId),
		{
			select: ({ data }) => data
		}
	)
    
	return (
		<>
			<div className="flex items-center gap-2">
				<span className="text-[var(--dark-grey)]">Категория:</span>
				<span className={styles.product__attribute__text}>{category?.name}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-[var(--dark-grey)]">Подкатегория:</span>
				<Link
					className={clsx(styles.product__attribute__text, 'underline') }
					href={`/category/${subcategory?.slug}`}
				>
					{subcategory?.name}
				</Link>
			</div>
		</>
	)
}
