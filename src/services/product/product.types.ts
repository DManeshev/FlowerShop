export enum EnumProductSort {
    HIGH_PRICE = 'high-price',
    LOW_PRICE = 'low-price',
}

export type TypeProductDataFilters = {
    sort?: EnumProductSort
    searchTerm?: string
    categoryTerm?: number
    page?: string | number
    perPage?: string | number
}