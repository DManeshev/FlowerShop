import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialOrderState } from './order.types';
import { EnumDeliveryMethod } from '@/types/enum/orderStatus.enum';
import { OrderForm } from '@/services';

const defaultOrder: OrderForm = {
	name: '',
	phone: '',
	deliveryDate: '',
	deliveryTime: '',
	deliveryMethod: EnumDeliveryMethod.delivery,
	city: '',
	street: '',
	apartment: '',
}

const initialState: InitialOrderState = {
	order: defaultOrder,
	isOpenCheckoutDrawer: false,
}

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrder(state: InitialOrderState, action: PayloadAction<OrderForm>) {
			state.order = { ...state.order, ...action.payload }
		},

		resetOrder(state: InitialOrderState) {
			state.order = defaultOrder;
		},

		
		toggleCheckoutDrawer(state, action: PayloadAction<boolean>): void {
			state.isOpenCheckoutDrawer = action.payload
		}
	}
})
