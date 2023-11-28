import { ICart } from '@/types/cart.interface'

type TypeIncludeInCart = {
	cart: ICart[]
	id: number
}

export const includeInCart = ({
	cart,
	id
}: TypeIncludeInCart): boolean | ICart => {
	if (cart.length === 0) return false

	const findProductInCart = cart.find(cart => cart.product.id === id)

	if (findProductInCart) return findProductInCart
	else return false
}
