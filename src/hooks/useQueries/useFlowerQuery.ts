import { useQuery } from '@tanstack/react-query'

import { ProductService } from '@/services/product/product.service'

export const useFlowerQuery = () => {
	return useQuery(['flowers'], () => ProductService.getAllFlowers(), {
		select: ({ data }) =>
			data.map(item => ({
				id: String(item.id),
				name: item.name
			}))
	})
}
