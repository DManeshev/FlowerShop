import { productCategory } from '@/types/enum/category.enum'
import { productStatus } from '@/types/enum/productStatus.enum'

export const productStatusFind = (value: string): string => {
	const status = productStatus.find(item => item.id === value)

	if (status) return status.name
	return 'Статус не найден'
}

export const productCategoryFind = (value: string): string => {
	const category = productCategory.find(item => item.id === value)

	if (category) return category.name
	return 'Категория не найдена'
}
