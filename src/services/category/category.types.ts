export interface ICategory {
	id: number
	name: string
	slug: string
	icon: string
	image: string
	order: number
	subCategories: ICategory[]
}

export interface ICreateSubcategory {
	name: string
	categoryId: number
	icon: string
	order: number;
}