'use client'

import { useActions } from '@/hooks/useAction'
import { IProduct } from '@/types/product.interface'
import { FaPlus } from 'react-icons/fa6'

import Button from '@/components/ui/btn/button/Button'
import { useMediaQuery } from 'usehooks-ts'

interface IProductCardBtn {
	product: IProduct
}

export default function ProductCardBtn({ product }: IProductCardBtn) {
	const { addToCart } = useActions()
	const matches = useMediaQuery('(min-width: 768px)')

	const handleAddToCart = () =>
		addToCart({
			product,
			quantity: 1
		})

	return (
		<Button
			title="Добавить в корзину"
			size="large"
			onClick={handleAddToCart}
			icon={<FaPlus color="white" size={21} />}
		/>
	)
}
