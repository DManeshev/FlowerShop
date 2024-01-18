import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IOrder } from '@/types/order.interface'

interface IInitialOrderState
	extends Omit<IOrder, 'id' | 'createdAt' | 'status' | 'items'> {
	isPayment: boolean,
	isNotDelivery: boolean
}

const initialState: IInitialOrderState = {
	isPayment: false,
	isNotDelivery: false,
	name: '',
	phone: '',
	commentary: '',
	deliveryDate: '',
	deliveryTime: '',
	address: '',
	flat: '',
	hallway: ''
}

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrderValues(state, action: PayloadAction<IInitialOrderState>) {
			return action.payload
		}
	}
})
