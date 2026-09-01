'use client'

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useAction'

import styles from './button.module.scss'
import { formatPrice } from '@/lib/utils'


const BasketMobileBtn = () => {
	const { cart } = useTypedSelector(state => state.cart)
	const { openCart } = useActions()

	const total = cart.reduce((result, item) => {
		return result + item.product.price * item.quantity
	}, 0)

	return (
		<div className={styles.basketMobileBtn}>
			<button className={styles.basketMobileBtn__btn} onClick={() => openCart(true)}>
				<span>{formatPrice(total)}</span>
			</button>
		</div>
	)
}

export default BasketMobileBtn


