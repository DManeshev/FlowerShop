export enum EnumCategory {
	BOUQUET = 'bouquet',
	TOYS = 'toys',
	HOLIDAY = 'holiday',
	DECOR = 'decor',
}

interface IProductCategory {
	name: string
	id: EnumCategory
}

export const productCategory: IProductCategory[] = [
	{ name: 'Букеты', id: EnumCategory.BOUQUET },
	{ name: 'Мягкие игрушки', id: EnumCategory.TOYS },
	{ name: 'Праздник', id: EnumCategory.HOLIDAY },
	{ name: 'Вазы и декор', id: EnumCategory.DECOR },
]
