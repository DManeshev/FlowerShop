import * as userActions from './user/user.actions'
import { toastSlice } from './toast/toast.slice'
import { cartSlice } from './cart/cart.slice'

export const rootActions = {
	...userActions,
	...toastSlice.actions,
	...cartSlice.actions,
}
