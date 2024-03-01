import { useQuery } from '@tanstack/react-query'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { CategoryService } from '@/services/category/category.service'
import { IProduct } from '@/types/product.interface'

import Select from '@/components/ui/form/select/Select'

import styles from '../Dashboard.module.scss'
import { useState } from 'react'

interface IProductCategory {
	register: UseFormRegister<IProduct>
	setValue: UseFormSetValue<IProduct>
	errorMessage: string | undefined
}

export default function ProductCategory({
	errorMessage,
	setValue,
	register
}: IProductCategory) {
	const [categoryId, setCategoryId] = useState<number>(0)

	const { isLoading, data: categories } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
			select: ({ data }) =>
				data.map(item => ({
					id: String(item.id),
					name: item.name
				}))
		}
	)

	const { data: subcategories } = useQuery(
		['subcategory', categoryId],
		() => CategoryService.getSubcategoryByCategory(categoryId),
		{
			select: ({ data }) =>
				data.map(item => ({
					id: String(item.id),
					name: item.name
				}))
		}
	)

	return (
		<div className={styles.grid__container}>
			<Select
				selectList={categories || []}
				label="Категория"
				{...register('categoryName', {
					required: 'Поле Категория обязательное'
				})}
				handleChange={({ id, name }) => {
					setCategoryId(Number(id))
					setValue('categoryId', Number(id))
					setValue('categoryName', name)
				}}
				placeholder="Выберите категорию товара"
				error={errorMessage}
			/>

			{subcategories?.length ? (
				<Select
					selectList={subcategories}
					label="Подкатегория"
					{...register('subcategoryName', {
						required: 'Поле Подкатегория обязательное'
					})}
					handleChange={({ id, name }) => {
						setCategoryId(Number(id))
						setValue('subcategoryId', Number(id))
						setValue('subcategoryName', name)
					}}
					placeholder="Выберите подкатегорию товара"
					error={errorMessage}
				/>
			) : null}
		</div>
	)
}
