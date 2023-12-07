import { axiosClassic, instance } from "@/api/api.interceptor";
import { getProductUrl } from "@/config/url.config";
import { IFlower, IProduct, TypePaginationProducts } from "@/types/product.interface";
import { TypeProductDataFilters } from "./product.types";
import { IYandexFile } from "@/types/yandexfile.interface";

export const ProductService = {
    async getAll(queryData = {} as TypeProductDataFilters) {
        return axiosClassic<TypePaginationProducts>({
            url: getProductUrl(''),
            method: 'GET',
            params: queryData
        })
    },

    async getById(id: string | number) {
        return instance<IProduct>({
            url: getProductUrl(`/${id}`),
            method: 'GET'
        })
    },

    async getBySlug(slug: string) {
        return axiosClassic<IProduct>({
            url: getProductUrl(`/by-slug/${slug}`),
            method: 'GET'
        })
    },

    async getByCategory(categoryName: string) {
        return axiosClassic<IProduct[]>({
            url: getProductUrl(`/by-category/${categoryName}`),
            method: 'GET'
        })
    },

    async getBySubcategory(subcategorySlug: string) {
        return axiosClassic<IProduct[]>({
            url: getProductUrl(`/by-subcategory/${subcategorySlug}`),
            method: 'GET'
        })
    },

    async create(data: IProduct) {
        return instance<IProduct>({
            url: getProductUrl('/create'),
            method: 'POST',
            data
        })
    },
    
    async update(id: number | string, data: IProduct) {
        return instance<IProduct>({
            url: getProductUrl(`/${id}`),
            method: 'PUT',
            data
        })
    },

    async delete(id: number | string) {
        return instance<IProduct>({
            url: getProductUrl(`/${id}`),
            method: 'DELETE'
        })
    },

    async uploadFile(files: any) {
        return instance<IYandexFile[]>({
            url: '/files',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: files
        })
    },

    async deleteFile(data: { path: string}) {
        return instance<boolean>({
            url: `/files`,
            method: 'DELETE',
            data
        })  
    },

    async getAllFlowers() {
        return instance<IFlower[]>({
            url: '/flowers',
            method: 'GET'
        })
    },
}