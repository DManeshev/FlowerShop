
import { productStatus } from '@/types/enum/productStatus.enum'

export const productStatusFind = (value: string): string => {
	const status = productStatus.find(item => item.id === value)

	if (status) return status.name
	return 'Статус не найден'
}