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

	async getById(id: number) {
		return axiosClassic<ICategory>({
			url: `${URL}/${id}`,
			method: 'GET'
		})
	},

	async getSubcategoryByCategory(categoryId: number) {
		return axiosClassic<ICategory[]>({
			url: `${SUBCATEGORY_URL}/by-category/${categoryId}`,
			method: 'GET'
		})
	},

	async getSubcategoryBySlug(slug: string) {
		return axiosClassic<ICategory>({
			url: `${SUBCATEGORY_URL}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async getSubcategoryById(subcategoryId: number) {
		return axiosClassic<ICategory>({
			url: `${SUBCATEGORY_URL}/${subcategoryId}`,
			method: 'GET'
		})
	}
}
