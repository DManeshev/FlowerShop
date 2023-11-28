'use client'

import { ChangeEvent, useEffect, useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'

import Button from '@/components/ui/btn/button/Button'
import CartCard from '@/components/ui/cards/cartCard/Card'
import ModalSide from '@/components/ui/modal/ModalSide'
import SubHeading from '@/components/ui/heading/SubHeading'
import AuthHeaderBtn from './AuthHeaderBtn'

import styles from './Header.module.scss'

const Header = () => {
	useAuthRedirect()

	const { cart } = useTypedSelector(state => state.cart)

	const [position, setPosition] = useState<number>(0)
	const [visible, setVisible] = useState<boolean>(true)
	const [showCart, setShowCart] = useState<boolean>(false)

	const refModalCart = useRef<HTMLDivElement>(null)
	const router = useRouter()

	useEffect(() => {
		const handleScroll = () => {
			let moving = window.pageYOffset
			setVisible(position > moving)
			setPosition(moving)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	})

	const totalPrice = useMemo(() => {
		if (cart.length === 0) return 0

		const total = cart.reduce((result, item) => {
			return result + item.product.price * item.quantity
		}, 0)

		return total
	}, [cart])

	useOnClickOutside(refModalCart, () => {
		setShowCart(false)
		document.body.classList.remove('overflow-y-hidden')
	})

	return (
		<header className={clsx(styles.header, !visible && styles.header__hide)}>
			<div className={`${styles.container} ${styles.main}`}>

				<div className="flex items-center gap-5">
					<AuthHeaderBtn />
				</div>
			</div>

			<ModalSide
				title="Корзина"
				show={showCart}
				setShow={setShowCart}
				ref={refModalCart}
			>
				<div className={styles.modal__content}>
					{cart.length > 0 ? (
						<>
							<div className={styles.card__container}>
								{cart.map(item => (
									<CartCard key={item.product.id} {...item} />
								))}
							</div>
							<div className="h-auto">
								<div className={styles.total}>
									<div>Всего</div>
									<div className="text-[var(--green)] text-xl">
										<span>&#8381; </span>
										<span>{totalPrice}</span>
									</div>
								</div>

								<div className="flex justify-end">
									<Button
										title="Перейти к оформлению"
										onClick={() => {
											setShowCart(!showCart)
											router.push('/checkout')
										}}
									/>
								</div>
							</div>
						</>
					) : (
						<div className="m-auto flex flex-col items-center">
							<SubHeading title="В Корзине ничего нет" />
							<Button
								title="Добавить"
								onClick={() => {
									setShowCart(!showCart)
									router.push('/bouquet')
								}}
								size="large"
							/>
						</div>
					)}
				</div>
			</ModalSide>
		</header>
	)
}

export default Header
