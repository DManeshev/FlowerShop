import { notFound } from 'next/navigation'

import { CategoryService, ProductService } from '@/services'

import { ProductCard } from '@/components/ui/cards/productCard/Card'
import NotFoundProducts from '@/components/errors/NotFoundProducts'

import styles from './Page.module.scss'

type Params = Promise<{ slug: string }>

export default async function Page(props: { params: Params }) {
	const params = await props.params
	const slug = params.slug

	const { data: category } = await CategoryService.getBySlug(slug);

	if (!category) notFound()

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
