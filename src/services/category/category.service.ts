import { axiosClassic, instance } from '@/api/api.interceptor'
import { ICategory, ICreateSubcategory } from './category.types'

const URL = '/categories' as const

export const CategoryService = {
	async getAll(): Promise<Array<ICategory>> {
		const { data } = await axiosClassic<Array<ICategory>>({
			url: URL,
			method: 'GET'
		});

		return data;
	},

	async getAllSubcategories(): Promise<Array<ICategory>> {
		const { data } = await axiosClassic<Array<ICategory>>({
			url: `${URL}/subcategories`,
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

	async getSubcategoriesByParentId(parentId: number) {
		return instance<Array<ICategory>>({
			url: `${URL}/subcategories/${parentId}`,
			method: 'GET'
		})
	},

	async createCategory(data: ICreateSubcategory) {
		return instance<ICategory>({
			url: URL,
			method: 'POST',
			data
		})
	}
}