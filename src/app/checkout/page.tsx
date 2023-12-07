import { CategoryService } from '@/services/category/category.service'

import Home from '../home/Home'
import Checkout from './Checkout'

export const revalidate = 3600

const getCategories = async () => {
	const { data } = await CategoryService.getAll()

	return data
}

export default async function CheckoutPage() {
	const data = await getCategories()

	return (
		<>
			<Home categories={data} />
			<Checkout />
		</>
	)
}
