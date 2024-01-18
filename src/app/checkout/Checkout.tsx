'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import Payment from './(components)/Payment'
import CheckoutForm from './(components)/CheckoutForm'
import DrawerDesctop from '@/components/ui/drawer/DrawerDesctop'
import DrawerMobile from '@/components/ui/drawer/DrawerMobile'
import EmptyBasket from '@/components/layout/basket/components/EmptyBasket'

export default function Checkout() {
	const {
		cart: { cart },
		order
	} = useTypedSelector(state => state)

	const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(true)

	const router = useRouter()
	const matches = useMediaQuery('(min-width: 1024px)')
	const refDrawer = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isOpenDrawer) document.body.classList.add('scrollbar__body')
		else document.body.classList.remove('scrollbar__body')
	}, [isOpenDrawer])

	useOnClickOutside(refDrawer, () => {
		setIsOpenDrawer(false)
		router.push('/')
	})

	const handleCloseDrawer = () => {
		setIsOpenDrawer(false)
		router.push('/')
	}

	const content = !order.isPayment ? <CheckoutForm /> : <Payment cart={cart} />

	return (
		<>
			{matches ? (
				<DrawerDesctop
					ref={refDrawer}
					isOpen={isOpenDrawer}
					close={handleCloseDrawer}
				>
					{cart.length > 0 ? content : <EmptyBasket />}
				</DrawerDesctop>
			) : (
				<DrawerMobile
					ref={refDrawer}
					isOpen={isOpenDrawer}
					close={handleCloseDrawer}
				>
					{cart.length > 0 ? content : <EmptyBasket />}
				</DrawerMobile>
			)}
		</>
	)
}
