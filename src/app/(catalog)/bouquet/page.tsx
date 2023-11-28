import { ProductService } from '@/services/product/product.service'
import { EnumCategory } from '@/types/enum/category.enum'

import CatalogWrapper from '../CatalogWrapper'

const getProductsByCategory = async (category: EnumCategory) => {
    const { data } = await ProductService.getByCategory(category)

    return data
}

export default async function BouquetsPage() {
    const data = await getProductsByCategory(EnumCategory.BOUQUET)
    
	return <CatalogWrapper products={data} />
}
