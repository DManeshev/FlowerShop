import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IOrder } from '@/types/order.interface'
import { EnumDeliveryMethod } from '@/types/enum/orderStatus.enum'

interface IInitialOrderState
	extends Omit<IOrder, 'id' | 'createdAt' | 'status' | 'items'> {
	isPayment: boolean,
}

const initialState: IInitialOrderState = {
	isPayment: false,
	deliveryMethod: EnumDeliveryMethod.delivery,
	name: '',
	phone: '',
	commentary: '',
	deliveryDate: '',
	deliveryTime: '',
	city: '',
	street: '',
	houseNumber: '',
	apartment: '',
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
