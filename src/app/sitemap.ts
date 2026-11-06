import type { MetadataRoute } from 'next'
import { ProductService } from '@/services/product/product.service'
import { CategoryService } from '@/services/category/category.service'

const BASE = 'https://yourflowers21.ru'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [{ data: productsResponse }, categories] = await Promise.all([
		ProductService.getAll({ limit: 10_000 } as any),
		CategoryService.getAll()
	])

	const products = productsResponse?.products ?? []

	const categoryIdsWithProducts = new Set<number>()
	for (const product of products) {
		if (product.categoryId) categoryIdsWithProducts.add(product.categoryId)
		if (product.category?.id) categoryIdsWithProducts.add(product.category.id)
	}

	const staticPages = ['', '/delivery', '/subscription', '/privacy']

	return [
		...staticPages.map(path => ({
			url: `${BASE}${path}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: path === '' ? 1 : 0.6
		})),
		...categories
			.filter(c => c.subcategories?.length || categoryIdsWithProducts.has(c.id))
			.map(c => ({
				url: `${BASE}/category/${encodeURIComponent(c.slug)}`,
				lastModified: new Date(c.createdAt),
				changeFrequency: 'daily' as const,
				priority: 0.8
			})),
		...products.map(p => ({
			url: `${BASE}/product/${encodeURIComponent(p.slug)}`,
			lastModified: new Date(p.createdAt),
			changeFrequency: 'weekly' as const,
			priority: 0.7
		}))
	]
}