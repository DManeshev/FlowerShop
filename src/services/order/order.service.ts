import { instance, axiosClassic } from '@/api/api.interceptor'
import { getOrderUrl } from '@/config/url.config'
import { IOrder, OrderRequest } from './order.types'

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: getOrderUrl(''),
			method: 'GET'
		})
	},

	async placeOrder(data: OrderRequest): Promise<IOrder> {
		return axiosClassic({
			method: 'POST',
			url: '/orders',
			data
		})
	},
}
