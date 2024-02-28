'use client'

import { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Map, Placemark } from '@pbe/react-yandex-maps'
import { useOnClickOutside, useMediaQuery } from 'usehooks-ts'

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useAction'

import CartCard from '@/components/ui/cards/cartCard/Card'
import TotalPrice from './components/TotalPrice'
import EmptyBasket from './components/EmptyBasket'
import DrawerMobile from '@/components/ui/drawer/DrawerMobile'

import styles from './Basket.module.scss'
import Modal from '@/components/ui/modal/Modal'
import Link from 'next/link'

export default function Basket() {
	const { cart, isOpenCart } = useTypedSelector(state => state.cart)
	const { openCart } = useActions()

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const modalRef = useRef<HTMLDivElement>(null)
	const refDrawer = useRef<HTMLDivElement>(null)
	const matches = useMediaQuery('(min-width: 1024px)')

	useEffect(() => {
		if (isOpenCart || isOpen) document.body.classList.add('scrollbar__body')
		else document.body.classList.remove('scrollbar__body')
	}, [isOpenCart, isOpen])

	useOnClickOutside(refDrawer, () => openCart(false))

	const total = cart.reduce((result, item) => {
		return result + item.product.price * item.quantity
	}, 0)

	return (
		<>
			<aside className={styles.aside}>
				<div className={styles.aside__container}>
					<div className={styles.info}>
						<div className="flex items-center gap-5">
							<div className={styles.info__map} onClick={() => setIsOpen(true)}>
								<FaMapMarkerAlt size={20} color="var(--purple)" />
								<span>г. Чебоксары, Чебоксарский пр-кт, 27</span>
							</div>
						</div>
					</div>

					<div className={styles.basket}>
						{cart.length > 0 ? (
							<div className={styles.basket__container}>
								<div className="flex flex-col gap-3 flex-grow">
									{cart.map(item => (
										<CartCard key={item.product.id} {...item} />
									))}
								</div>

								<TotalPrice total={total} closeCart={() => openCart(false)} />
							</div>
						) : (
							<EmptyBasket />
						)}
					</div>
				</div>
			</aside>

			{!matches ? (
				<DrawerMobile
					ref={refDrawer}
					isOpen={isOpenCart}
					closeDrawer={() => openCart(false)}
				>
					<div className="flex-grow flex flex-col gap-4 pt-10">
						{cart.length > 0 ? (
							<>
								{cart.map(item => (
									<CartCard key={item.product.id} {...item} />
								))}
							</>
						) : (
							<EmptyBasket />
						)}
					</div>

					<TotalPrice total={total} closeCart={() => openCart(false)} />
				</DrawerMobile>
			) : null}

			<Modal isOpen={isOpen} close={() => setIsOpen(false)} ref={modalRef}>
				<div className={styles.container__map}>
					<Map
						defaultState={{ center: [56.125299, 47.384112], zoom: 17 }}
						width="100%"
						height="100%"
					>
						<Placemark geometry={[56.125299, 47.384112]} />
					</Map>
				</div>
			</Modal>
		</>
	)
}
