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
export default async function ProductDetailPage({ params }: IProductSlugPage) {
    const { data } = await getProductBySlug(params.slug)

    return <Product {...data} />
}