import { ProductService } from '@/services/product/product.service'

import Product from './Product'

type Params = Promise<{ slug: string }>

const getProductBySlug = async (slug: string) => {
	const product = await ProductService.getBySlug(slug)

	return product
}

export default async function ProductDetailPage(props: { params: Params }) {
  const params = await props.params
  const slug = params.slug

	const { data } = await getProductBySlug(slug)

	return <Product {...data} />
}
