import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { OrderService } from '@/services/order/order.service'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ICart } from '@/types/cart.interface'
import { formatPrice } from '@/lib/utils'

import Button from '@/components/ui/btn/button/Button'
import Heading from '@/components/ui/heading/Heading'
import CartCard from '@/components/ui/cards/cartCard/Card'

import styles from '../Checkout.module.scss'

interface ICheckoutPayment {
	cart: ICart[]
  closeModal(): void
}

export default function Payment({ cart, closeModal }: ICheckoutPayment) {
	const { order } = useTypedSelector(state => state)

	const { mutate } = useMutation(OrderService.placeOrder)

	const router = useRouter()

	const total = cart.reduce((result, item) => {
		return result + item.product.price * item.quantity
	}, 0)

	const checkoutOrder = useCallback(() => {
		let { isPayment, ...rest } = order

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
        closeModal();

				router.push('/thanks')
			},
			onError: (error, variables, context) => {
				console.log(error)
			}
		})
	}, [mutate])

  const address = `${order.city}, ${order.street}, ${order.apartment}, ${order.houseNumber}`

	return (
		<div className={styles.payment}>
			<div className={styles.payment__container}>
				<Heading title="Информация о заказе" />

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
					<span className={styles.payment__text}>{address}</span>
				</div>

				<div className={styles.payment__info}>
					<div className={styles.payment__label}>Дата и время доставки:</div>
					<span className={styles.payment__text}>
						{order.deliveryDate} с {order.deliveryTime}
					</span>
				</div>
			</div>

			<div className={styles.payment__container}>
				<Heading title="Заказ" />

				{cart.map(item => (
					<CartCard key={item.product.id} productCart={item} setOpen={() => {}} />
				))}
			</div>

			<div className="w-full flex flex-col mt-auto">
				<div className={styles.total}>
					<div className={styles.total__text}>Итого</div>
					<div className={styles.total__price}>
                        <span>{formatPrice(total)}</span>
					</div>
				</div>
				<Button onClick={checkoutOrder} title="Оплатить" size="large" /> 
			</div>
		</div>
	)
}
