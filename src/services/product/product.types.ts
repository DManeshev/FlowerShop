import { EnumProductStatus } from "@/types/enum/productStatus.enum"

export enum EnumProductSort {
    HIGH_PRICE = 'high-price',
    LOW_PRICE = 'low-price',
}

export interface IFlower {
	id: number
	name: string
}

export interface IProduct {
	id: number;
	createdAt: string;
	name: string;
	slug: string;
	images: Array<string>;
	price: number;
	categoryId: number;
	subcategoryId: number;
	status: EnumProductStatus;
	isDelivery: boolean;
	flowers: Array<IFlower>;
    
    categoryName?: string;
    subcategoryName?: string;
    description?: string;
	statusName?: string
	isDeliveryName?: string;
	flowersNames?: string;
}

export type TypePaginationProducts = {
    products: Array<IProduct>;
	length: number;
}

export type TypeProductDataFilters = {
    sort?: EnumProductSort
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