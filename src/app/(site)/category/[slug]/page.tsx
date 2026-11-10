import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CategoryService, ProductService } from '@/services'

import { ProductCard } from '@/components/ui/cards/productCard/Card'
import NotFoundProducts from '@/components/errors/NotFoundProducts'

import styles from './Page.module.scss'

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { slug } = await params
	const { data: category } = await CategoryService.getBySlug(slug)

	if (!category) {
		return { title: 'Категория не найдена', robots: { index: false, follow: false } }
	}

	const url = `/category/${encodeURIComponent(slug)}`
	const { data: products } = await ProductService.getByCategory(slug)
	const firstImage = products?.[0]?.images?.[0]

	const description = `${category.name} — букеты с доставкой по Чебоксарам, Новому Городу и Новочебоксарску. Заказывайте онлайн в «Твои цветы 21».`.slice(0, 155)

	return {
		title: `Букеты «${category.name}» — доставка по Чебоксарам`,
		description,
		alternates: { canonical: url },
		openGraph: {
			type: 'website',
			url,
			title: `Букеты «${category.name}»`,
			description,
			images: firstImage
				? [{ url: firstImage, width: 1200, height: 630, alt: category.name }]
				: [{ url: '/og/og-home.jpg', width: 1200, height: 630, alt: category.name }]
		}
	}
}

export default async function Page(props: { params: Params }) {
	const params = await props.params
	const slug = params.slug

	const { data: category } = await CategoryService.getBySlug(slug);

	if (!category) notFound()

	const { data: products } = await ProductService.getByCategory(slug)

	return (
		<>
			<h1 className="sr-only">{category.name}</h1>
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
