import { ICart } from '@/store'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { Separator } from '@/components/ui/separator'
import { OrderProductCard } from '@/components/ui/cards/orderProductCard/OrderProductCard'

import styles from './styles.module.scss'

export default function Payment() {
	const { order: { order }, cart: { cart } } = useTypedSelector(state => state);

	const orderAddress: string = `г. ${order.city}, ${order.street}, кв. ${order.apartment}`;

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
		</div>
	)
}
