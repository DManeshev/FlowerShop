import type { Metadata } from 'next'

import DetailProduct from '@/app/(detail)/DetailProduct'
import NotFound from '@/app/not-found'

import { ProductService } from '@/services/product/product.service'
import { IPageSlugParam } from '@/types/page-params'

export const metadata: Metadata = {
	title: '',
	description: ''
}

const getProductBySlug = async (slug: string) => {
  const { data } = await ProductService.getBySlug(slug)

  // if (!data) NotFound()

  return data
}

export default async function DetailPage({ params: { slug } }: IPageSlugParam) {
  const product = await getProductBySlug(slug)

  if (!product) NotFound()

	return <DetailProduct product={product} />
}
