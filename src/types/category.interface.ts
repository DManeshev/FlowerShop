export interface ICategory {
	id: number
	name: string
	slug: string
	icon: string
	image: string
	order: number
	subCategories: ICategory[]
}
