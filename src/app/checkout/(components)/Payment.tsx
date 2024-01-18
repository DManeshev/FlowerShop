import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { OrderService } from '@/services/order/order.service'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ICart } from '@/types/cart.interface'

import Button from '@/components/ui/btn/button/Button'
import Heading from '@/components/ui/heading/Heading'
import CartCard from '@/components/ui/cards/cartCard/Card'

import styles from '../Checkout.module.scss'

interface ICheckoutPayment {
	cart: ICart[]
}

const DELIVERY_PRICE = 300

export default function Payment({ cart }: ICheckoutPayment) {
	const { order } = useTypedSelector(state => state)

	const { mutate } = useMutation(OrderService.placeOrder)

	const router = useRouter()

	const total = cart.reduce((result, item) => {
		return result + item.product.price * item.quantity
	}, 0)

	const checkoutOrder = useCallback(() => {
		let { isNotDelivery, isPayment, ...rest } = order

		const orderObject = {
			...rest,
			items: cart.map(({ product, quantity }) => ({
				productId: product.id,
				price: product.price,
				quantity
			}))
		}
		
		mutate(orderObject, {
			onSuccess: ({ data }, variables, context) => {
				router.push(data.confirmation.confirmation_url)
			},
			onError: (error, variables, context) => {
				console.log(error)
			}
		})
	}, [mutate])

	return (
		<div className={styles.payment}>
			<div className={styles.payment__container}>
				<Heading title="Информация о клиенте" />

				<div className={styles.payment__info}>
					<div className={styles.payment__label}>Имя:</div>
					<span className={styles.payment__text}>{order.name}</span>
				</div>
				<div className={styles.payment__info}>
					<div className={styles.payment__label}>Телефон:</div>
					<span className={styles.payment__text}>{order.phone}</span>
				</div>
				<div className={styles.payment__info}>
					<div className={styles.payment__label}>Комментарий:</div>
					<span className={styles.payment__text}>{order.commentary}</span>
				</div>
				<div className={styles.payment__info}>
					<div className={styles.payment__label}>Адрес доставки:</div>
					<span className={styles.payment__text}>{order.address}</span>
				</div>

				<div className={styles.payment__info}>
					<div className={styles.payment__label}>Дата и время доставки:</div>
					<span className={styles.payment__text}>
						{order.deliveryDate} с {order.deliveryTime}
					</span>
				</div>

				{!order.isNotDelivery ? (
					<div className={styles.payment__info}>
						<div className={styles.payment__label}>Стоимость доставки:</div>
						<span className={styles.price}>{DELIVERY_PRICE} &#8381;</span>
					</div>
				) : null}
			</div>

			<div className={styles.payment__container}>
				<Heading title="Заказ" />

				{cart.map(item => (
					<CartCard key={item.product.id} {...item} />
				))}
			</div>

			<div className="w-full flex flex-col mt-auto">
				<div className={styles.total}>
					<div className={styles.total__text}>Итого</div>
					<div className={styles.total__price}>
						<span>{order.isNotDelivery ? total : total + DELIVERY_PRICE}</span>
						<span>&#8381; </span>
					</div>
				</div>
				<Button title="Оплатить" size="large" onClick={checkoutOrder} />
			</div>
		</div>
	)
}
