import { CategoryService } from '@/services/category/category.service'

import Home from './home/Home'

// export const metadata: Metadata = {
//     title: '',
//     description: ''
// }

export const revalidate = 3600

const getCategories = async () => {
	const { data } = await CategoryService.getAll()

	return data
}

export default async function HomePage() {
	const data = await getCategories()

	return <Home categories={data} />
}
