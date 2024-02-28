import { PayloadAction, createSlice, current } from '@reduxjs/toolkit'

import { IProduct } from '@/types/product.interface'
import { ICart } from '@/types/cart.interface'
import { includeInCart } from '@/utils/includeInCart'

interface IInitialState {
	cart: ICart[]
	isOpenCart: boolean
}

const initialState: IInitialState = {
	cart: [],
	isOpenCart: false
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(
			state,
			action: PayloadAction<{ product: IProduct; quantity: number }>
		) {
			const { product, quantity } = action.payload
			const findProductInCart = state.cart.find(
				item => item.product.id === product.id
			)

			if (findProductInCart) return

			state.cart.push({
				product,
				quantity: quantity === 0 ? 1 : quantity
			})
		},

		removeFromCart(state, action: PayloadAction<{ id: number }>) {
			const { id } = action.payload
			const findProductInCart = state.cart.find(item => item.product.id === id)

			if (findProductInCart) {
				state.cart = state.cart.filter(
					item => item.product.id !== findProductInCart.product.id
				)
			}
		},

		changeProductQuantity(
			state,
			action: PayloadAction<{ id: number; count: number }>
		) {
			const { id, count } = action.payload

			const findProductInCart = includeInCart({ cart: state.cart, id })

			if (typeof findProductInCart !== 'boolean') {
				findProductInCart.quantity = count === 0 ? 1 : count
			}
		},

		openCart(state, action: PayloadAction<boolean>) {
			state.isOpenCart = action.payload
		}
	}
})
