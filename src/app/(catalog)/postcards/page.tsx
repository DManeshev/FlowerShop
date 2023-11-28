import { ProductService } from '@/services/product/product.service'
import { EnumCategory } from '@/types/enum/category.enum'

import CatalogWrapper from '../CatalogWrapper'

const getProductsByCategory = async (category: EnumCategory) => {
	const { data } = await ProductService.getByCategory(category)

	return data
}

export default async function PlantsPage() {
    const data = await getProductsByCategory(EnumCategory.POSTCARDS)

	return <CatalogWrapper products={data} />
}