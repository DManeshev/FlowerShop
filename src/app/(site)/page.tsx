import { ProductService } from '@/services'

import Home from './home/Home'

export const revalidate = 3600

export default async function HomePage() {
	const { data } = await ProductService.getAll()

	return <Home paginationProducts={data} />
}
