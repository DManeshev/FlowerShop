import { ProductService } from '@/services/product/product.service'

import Home from './home/Home'

// export const metadata: Metadata = {
//     title: '',
//     description: ''
// }

export const revalidate = 3600

const getProducts = async () => {
	const { data } = await ProductService.getAll()

	return data
}

export default async function HomePage() {
	const data = await getProducts()

	return <Home paginationProducts={data} />
}
