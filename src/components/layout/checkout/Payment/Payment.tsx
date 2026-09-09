import { useCallback, useMemo } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { ICart } from '@/store'
import { OrderService } from '@/services/order/order.service'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { formatPrice } from '@/lib/utils'
import { useActions } from '@/hooks/useAction'
import { OrderRequest } from '@/services'
import { EnumOrderStatus } from '@/types'

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'
import { OrderProductCard } from '@/components/ui/cards/orderProductCard/OrderProductCard'

import styles from './styles.module.scss'

export default function Payment() {
	const { order: { order}, cart: { cart } } = useTypedSelector(state => state);
	const { toggleCheckoutDrawer } = useActions();

	const { mutateAsync } = useMutation({ mutationFn: OrderService.placeOrder })

	const router = useRouter()

	const total: number = useMemo(() => {
		return cart.reduce((result: number, item: ICart) =>
			result + (item.product.price * item.quantity), 0)
	}, [cart]);

	const orderAddress: string = `г. ${order.city}, ${order.street}, кв. ${order.apartment}`;

	const createOrder = async () => {
		const orderRequest: OrderRequest = {
			...order,
			items: cart.map(({ product, quantity }) => ({
				productId: product.id,
				price: product.price,
				quantity
			})),
			status: EnumOrderStatus.PENDING
		};

		try {
			const response = await mutateAsync(orderRequest);

			if (response) {
				toggleCheckoutDrawer(false)
				router.push('/thanks')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className={styles.payment}>
			<div className={styles.personal}>
				<div className={styles.personal__name}>{order.name}</div>
				<div className={styles.personal__phone}>{order.phone}</div>
				{order.deliveryMethod === 'delivery' ? (
					<div className={styles.personal__address}>{orderAddress}</div>
				) : (
					<div className={styles.personal__address}>
						<span>Заказ будет выдан по адресу: </span>
						<span className={styles.highlight}>г. Чебоксары, ул. Стартовая, д. 3</span>
					</div>
				)}
			</div>

			<Separator />

			<div className={styles.order}>
				<div className={styles.order__title}>Заказ</div>

				<div className='grid place-items-center grow'>
					<div className={styles.order__products}>
						{cart.map((item: ICart) => (
							<OrderProductCard key={item.product.id} product={item.product} />
						))}
					</div>
				</div>
			</div>
			
			<div className={styles.footer}>
				<div className={styles.total}>
					<span>{formatPrice(total)}</span>
				</div>
				<Button
					onClick={createOrder}
					size="xl"
					className={styles.payment__btn}
				>
					<span>Заказать</span>
				</Button>
			</div>
		</div>
	)
}
