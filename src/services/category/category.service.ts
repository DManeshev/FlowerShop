import { axiosClassic } from '@/api/api.interceptor'
import { ICategory } from '@/types/category.interface'

const URL = '/categories' as const
const SUBCATEGORY_URL = '/subcategory' as const

export const CategoryService = {
	async getAll() {
		return axiosClassic<ICategory[]>({
			url: URL,
			method: 'GET'
		})
	},

	async getByCategory(categoryId: number) {
		return axiosClassic<ICategory[]>({
			url: `${SUBCATEGORY_URL}/by-category/${categoryId}`,
			method: 'GET'
		})
	}
}
