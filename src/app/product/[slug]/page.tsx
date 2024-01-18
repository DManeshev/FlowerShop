import { ProductService } from '@/services/product/product.service'

import Product from './Product'

interface IProductSlugPage {
	params: {
		slug: string
	}
}

const getProductBySlug = async (slug: string) => {
    const product = await ProductService.getBySlug(slug)

    return product
}

const getProductsBySubcategorySlug = async (slug: string) => {
	const { data: products } = await ProductService.getBySubcategory(slug)

	return products
}

export default async function ProductPage({ params }: IProductSlugPage) {
	const { data } = await getProductBySlug(params.slug)
	// const products = await getProductsBySubcategorySlug()

    console.log(params)
	// return <Product {...data} />
	return (
		<div>asdfsdf</div>
	)
}
