import { IProduct, ProductService } from '@/services'

import { ProductCard } from '@/components/ui/cards/productCard/Card'
import NotFoundProducts from '@/components/errors/NotFoundProducts'

import styles from './Page.module.scss'

type Params = Promise<{ slug: string }>

export default async function Page(props: { params: Params }) {
	const params = await props.params
	const slug = params.slug

	const { data: products } = await ProductService.getByCategory(slug)

	return (
		<>
			{products.length > 0 ? (
				<div className={styles.products}>
					{products.map(item =>
						<ProductCard key={item.id} {...item} />
					)}
				</div>
			) : (
				<NotFoundProducts />
			)}
		</>
	)
}
