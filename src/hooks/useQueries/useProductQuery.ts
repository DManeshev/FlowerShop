import { useQuery } from '@tanstack/react-query'

import { ProductService } from '@/services'

interface IUseProductQuery {
	searchTerm?: string,
	enabled?: boolean
}

export const useProductQuery = (options: IUseProductQuery) => {
	const {
		searchTerm = '',
		...rest
	} = options;

	return useQuery({
		queryKey: ['products', 'search', searchTerm],
		queryFn: () => ProductService.getAll({
			searchTerm
		}),
		select: ({ data }) => data,
		...rest
	})
}
