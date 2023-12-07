import { ProductService } from '@/services/product/product.service'

import Card from '@/components/ui/cards/productCard/Card'
import NotFound from '@/app/not-found'

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
						<Card key={item.id} {...item } />	
					)}
				</div>
			) : (
				<NotFound />
			)}
		</>
	)
}
