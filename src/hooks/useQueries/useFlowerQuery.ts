import { useQuery } from '@tanstack/react-query'

import { ProductService } from '@/services'

export const useFlowerQuery = () => {
	return useQuery({
		queryKey: ['flowers'],
		queryFn: () => ProductService.getAllFlowers(),
		select: ({ data }) => data
	})
}
