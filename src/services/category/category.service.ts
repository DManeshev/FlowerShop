import { axiosClassic } from '@/api/api.interceptor'
import { ICategory } from '@/types/category.interface'
import { AxiosResponse } from 'axios'

const URL = '/categories' as const
const SUBCATEGORY_URL = '/subcategory' as const

export const CategoryService = {
	async getAll(): Promise<Array<ICategory>> {
		const { data } = await axiosClassic<Array<ICategory>>({
			url: URL,
			method: 'GET'
		});

		return data;
	},

	async getById(id: number) {
		return axiosClassic<ICategory>({
			url: `${URL}/${id}`,
			method: 'GET'
		})
	},

	async getAllSubcategory(): Promise<Array<ICategory>> {
		const { data } = await axiosClassic<Array<ICategory>>({
			url: SUBCATEGORY_URL,
			method: 'GET'
		});

		return data;
	},

	async getSubcategoryByCategory(categoryId: number) {
		return axiosClassic<Array<ICategory>>({
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
