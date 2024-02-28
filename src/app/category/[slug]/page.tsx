import { ProductService } from '@/services/product/product.service'

import { ProductCard } from '@/components/ui/cards/productCard/Card'
import NotFoundProducts from '@/components/errors/NotFoundProducts'

import styles from './Page.module.scss'

interface ISlugPage {
	params: {
		slug: string
	}
}

const getProductsBySubcategorySlug = async (slug: string) => {
	const { data } = await ProductService.getBySubcategory(slug)

	return data
}

export default async function Page({ params }: ISlugPage) {
	const products = await getProductsBySubcategorySlug(params.slug)

	return (
		<>
			{products.length > 0 ? (
				<div className={styles.products}>
					{products.map(item => 
						<ProductCard key={item.id} {...item } />
					)}
				</div>
			) : (
				<NotFoundProducts />
			)}
		</>
	)
}
