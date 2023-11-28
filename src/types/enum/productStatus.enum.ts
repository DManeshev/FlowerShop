export enum EnumProductStatus {
	inStock = 'inStock',
	outStock = 'outStock',
	customMade = 'customMade'
}

export const productStatus = [
	{ name: 'В наличии', id: 'inStock' },
	{ name: 'Нет в наличии', id: 'outStock' },
	{ name: 'Под заказ', id: 'customMade' }
]
