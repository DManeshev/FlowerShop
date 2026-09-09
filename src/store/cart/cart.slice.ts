import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { InitialCartState } from './cart.types'

import { IProduct } from '@/services'
import { includeInCart } from '@/utils/includeInCart'

const initialState: InitialCartState = {
	cart: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(
			state,
			action: PayloadAction<{ product: IProduct; quantity: number }>
		): void {
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

		clearCart(state): void {
			state.cart = [];
		},

		deleteProductFromCart(state, action: PayloadAction<{ id: number }>): void {
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
		): void {
			const { id, count } = action.payload

			const findProductInCart = includeInCart({ cart: state.cart, id })

			if (typeof findProductInCart !== 'boolean') {
				findProductInCart.quantity = count === 0 ? 1 : count
			}
		},
	}
})
