'use client'

import { useState } from 'react'
import { useActions } from '@/hooks/useAction'

import { IProduct } from '@/types/product.interface'

import Button from '@/components/ui/btn/button/Button'
import QuantityContainer from '@/components/ui/quantity/Quantity'

import IconAdd from '@/assets/images/icons/IconAdd.svg'

interface DetailProductCart {
	product: IProduct
}

export default function DetailProductCart({ product }: DetailProductCart) {
	const [count, setCount] = useState<number>(1)

	const { addToCart } = useActions()

	const handleCount = (countNumber: number, productId: number) => {
		countNumber === 0 ? setCount(1) : setCount(countNumber)
	}

	const add = () => {
		addToCart({
			product,
			quantity: count
		})
	}

	return (
		<div className="flex items-center gap-6">
			<QuantityContainer
				productId={0}
				count={count}
				handleCount={handleCount}
			/>

			<Button title="Добавить в корзину" icon={IconAdd} onClick={add} />
		</div>
	)
}
