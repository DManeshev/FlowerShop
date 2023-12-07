'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaBasketShopping } from 'react-icons/fa6'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import Heading from '@/components/ui/heading/Heading'
import AsideMap from './AsideMap'
import CartCard from '@/components/ui/cards/cartCard/Card'
import MobileDrawer from '../mobile/mobileDrawer/MobileDrawer'
import BasketMobileBtn from './components/BasketMobileBtn'

import styles from './Basket.module.scss'
import TotalPrice from './components/TotalPrice'

interface IBasket {}

export default function Basket({}: IBasket) {
	const { cart } = useTypedSelector(state => state.cart)

	const [isOpenCart, setIsOpenCart] = useState<boolean>(false)

	const router = useRouter()

	const total = cart.reduce((result, item) => {
		return result + item.product.price * item.quantity
	}, 0)

	const handleOpenMobileCart = () => setIsOpenCart(!isOpenCart)

	return (
		<>
			<aside className={styles.aside}>
				<div className={styles.aside__container}>
					<div className={styles.info}>
						<div className={styles.info__logo}></div>

						<AsideMap />
					</div>

					<div className={styles.basket}>
						{cart.length > 0 ? (
							<div className={styles.basket__container}>
								<div className="flex flex-col gap-3 flex-grow">
									{cart.map(item => (
										<CartCard key={item.product.id} {...item} />
									))}
								</div>

								<TotalPrice total={total} closeCart={() => setIsOpenCart(false)} />
							</div>
						) : (
							<div className="h-full flex flex-col items-center justify-center">
								<FaBasketShopping size={125} color="var(--green)" />
								<Heading
									title="В Корзине ничего нет"
									className="font-bold text-[var(--green)]"
								/>
							</div>
						)}
					</div>
				</div>
			</aside>

			<MobileDrawer isOpen={isOpenCart} closeCart={() => setIsOpenCart(false)}>
				<div className='flex-grow flex flex-col gap-4'>
					{cart.map(item => (
						<CartCard key={item.product.id} {...item} />
					))}
				</div>

				<TotalPrice total={total} closeCart={() => setIsOpenCart(false)} />
			</MobileDrawer>

			{cart.length > 0 ? (
				<BasketMobileBtn openMobileCart={handleOpenMobileCart} total={total} />
			) : null}
		</>
	)
}
