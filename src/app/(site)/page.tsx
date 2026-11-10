import { ProductService } from '@/services'

import Home from './home/Home'

export const revalidate = 3600

export default async function HomePage() {
	const { data } = await ProductService.getAll()

	return <>
		<h1 className="sr-only">Твои цветы 21 | Доставка цветов в Чебоксарах и Новочебоксарске</h1>
		<Home paginationProducts={data} />
	</>
}
