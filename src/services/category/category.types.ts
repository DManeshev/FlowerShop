export interface ICategory {
	id: number
	createdAt: string;
	name: string
	slug: string
	order: number
	parentId: number | null

	subcategories: ICategory[]
}

export interface ICreateSubcategory {
	name: string
	parentId: number | null
	order: number;
}