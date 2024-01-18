import * as userActions from './user/user.actions'
import { toastSlice } from './toast/toast.slice'
import { cartSlice } from './cart/cart.slice'
import { orderSlice } from './order/order.slice'

export const rootActions = {
	...userActions,
	...toastSlice.actions,
	...cartSlice.actions,
	...orderSlice.actions,
}
