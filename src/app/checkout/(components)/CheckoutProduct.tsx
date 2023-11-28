import { useMemo } from "react"
import Image from "next/image"

import { useActions } from '@/hooks/useAction'

import { ICart } from "@/types/cart.interface"

import Button from "@/components/ui/btn/button/Button"
import ButtonCartDelete from "@/components/ui/btn/buttonCartDelete/ButtonCartDelete"
import QuantityContainer from '@/components/ui/quantity/Quantity'

import styles from '../Checkout.module.scss'

interface ICheckoutProduct {
    cart: ICart[]
	delivery: string
}

export default function CheckoutProduct({ cart, delivery }: ICheckoutProduct) {
	const DELIVERY_PRICE = 300;

	const { changeProductQuantity } = useActions()

    const totalPrice = useMemo(() => {
        const total = cart.reduce((result, item) => {
			return result + (item.product.price * item.quantity) 
		}, 0)

		return total
    }, [cart])

    const handleCount = (count: number, productId: number) => changeProductQuantity({ id: productId, count })

	return (
		<section className={styles.products__section}>
			<div className={styles.products}>
				{cart.map(({ product, quantity }) => (
					<div key={product.id} className={styles.product}>
						<Image
							src={product.images[0]}
							alt={product.name}
							height={100}
							width={80}
							className={styles.product__image}
						/>

						<div className="flex-grow">
							<div className="flex items-start justify-between gap-2 pb-3">
								<div className={styles.product__text}>{product.name}</div>
								<ButtonCartDelete product={product} quantity={quantity} />
							</div>

							<div className="flex gap-3 pb-2">
								<div className={styles.product__quantity}>{quantity}x</div>
								<div className={styles.product__price}>
									<span>&#8381; </span>
									{product.price}
								</div>

								<div className="ml-auto flex gap-1 font-Lora font-bold text-[var(--green)]">
									<span>&#8381; </span>
									<div className={styles.price}>{quantity * product.price}</div>
								</div>
							</div>

							<QuantityContainer
								productId={product.id}
								count={quantity}
								handleCount={handleCount}
							/>

							{product.isDelivery ? null : <div className="text-[12px] text-red-500 mt-2">Доставка не осуществляется</div> }

						</div>
					</div>
				))}
			</div>

			<div className="border-y p-4">
				<div className="flex justify-between gap-3 pb-1">
					<span>Стоимость</span>
					<div className={styles.product__price}>
						<span>&#8381; </span>
						{totalPrice}
					</div>
				</div>
				<div className="flex justify-between gap-3">
					<span>Доставка</span>
					<span>{delivery}</span>
				</div>
				<div className="flex justify-between gap-3">
					<span>Стоимость доставки</span>
					<div className={styles.product__price}>
						<span>&#8381; {delivery === 'Самовызов' ? '0' : `${DELIVERY_PRICE}`}</span>
					</div>
				</div>

			</div>

			<div className="flex flex-col gap-3 p-4">
				<div className="flex justify-between gap-3">
					<span>Общая стоимость</span>
					<div className={styles.product__price}>
						<span>&#8381; </span>
						{delivery === 'Самовызов' ? totalPrice : `${totalPrice + DELIVERY_PRICE}`}
					</div>
				</div>
                
                <Button title="Перейти к оплате" />
			</div>
		</section>
	)
}
