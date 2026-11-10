import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductService } from '@/services'

import Product from './Product'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { slug } = await params
	const { data } = await ProductService.getBySlug(slug)

	if (!data?.id) {
		return { title: 'Товар не найден', robots: { index: false, follow: false } }
	}

	const url = `/product/${encodeURIComponent(slug)}`
	const description = (data.description ?? '').slice(0, 155)

	return {
		title: `${data.name} — купить с доставкой в Чебоксарах`,
		description,
		alternates: { canonical: url },
		openGraph: {
			type: 'website',
			url,
			title: data.name,
			description,
			images: data.images?.[0]
				? [{ url: data.images[0], width: 1200, height: 630, alt: data.name }]
				: undefined
		}
	}
}

export default async function ProductDetailPage(props: { params: Params }) {
	const params = await props.params
	const slug = params.slug

	const { data } = await ProductService.getBySlug(slug)

	if (!data?.id) notFound()

	return <Product {...data} />
}
