import { EnumProductStatus } from './enum/productStatus.enum'

export interface IProduct {
	id: number
	createdAt: string
	name: string
	slug: string
	description?: string
	images: string[]
	price: number
	categoryId: string
	subcategoryId: string
	status: EnumProductStatus
	statusName?: string
	isDelivery: boolean
	isDeliveryName?: string
	flowers: IFlower[]
	flowersNames?: string
}

export interface IFlower {
	id: number
	name: string
}

export interface IProductDetails {
	product: IProduct
}

export type TypeProducts = {
	products: IProduct[]
}

export type TypePaginationProducts = {
	products: IProduct[]
	length: number
}
