import { ProductService } from '@/services'

import Product from './Product'

type Params = Promise<{ slug: string }>

export default async function ProductDetailPage(props: { params: Params }) {
	const params = await props.params
	const slug = params.slug

	const { data } = await ProductService.getBySlug(slug)

	return <Product {...data} />
}
