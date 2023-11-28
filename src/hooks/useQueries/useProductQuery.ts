import { useQuery } from '@tanstack/react-query'

import { ProductService } from '@/services/product/product.service'

interface IUseProductQuery {
	enabled?: boolean
}

export const useProductQuery = (options?: IUseProductQuery) => {
	return useQuery(['all products'], () => ProductService.getAll(), {
		select: ({ data }) => data,
		...options
	})
}
