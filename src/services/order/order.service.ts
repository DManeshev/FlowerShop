import { instance, axiosClassic } from '@/api/api.interceptor'
import { getOrderUrl } from '@/config/url.config'
import { IOrder } from '@/types/order.interface'

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: getOrderUrl(''),
			method: 'GET'
		})
	},

	async placeOrder(data: IOrder) {
		return axiosClassic<{ confirmation: { confirmation_url: string } }>({
			method: 'POST',
			url: '/orders',
			data
		})
	}
}
