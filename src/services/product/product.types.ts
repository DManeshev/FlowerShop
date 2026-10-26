import { EnumProductStatus } from "@/types/enum/productStatus.enum"
import { ICategory } from "../category/category.types";

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
}

export interface IFlower {
	id: number
	name: string
}

export interface IProduct {
	id: number
	createdAt: string
	name: string
	slug: string
	images: Array<string>
	price: number
	categoryId: number
	category: ICategory | null
	status: EnumProductStatus
	isDelivery: boolean
	flowers: Array<IFlower>

	description?: string
}

export interface IProductForm extends IProduct {
	selectedParentCategoryId: number
	statusName: string
	isDeliveryName?: string;
}

export type TypePaginationProducts = {
	products: Array<IProduct>;
	length: number;
}

export type TypeProductDataFilters = {
	searchTerm?: string
	categoryTerm?: number
	page?: string | number
	perPage?: string | number
}

export interface IYandexFile {
	ETag: string,
	Location: string,
	key: string,
	Key: string,
	Bucket: string,
}