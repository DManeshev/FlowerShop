'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts'

import { useTypedSelector } from '@/hooks/useTypedSelector'

import Payment from './(components)/Payment'
import CheckoutForm from './(components)/CheckoutForm'
import DrawerDesctop from '@/components/ui/drawer/DrawerDesctop'
import DrawerMobile from '@/components/ui/drawer/DrawerMobile'
import EmptyBasket from '@/components/layout/basket/ui/EmptyBasket'

export default function Checkout() {
	const {
		cart: { cart },
		order
	} = useTypedSelector(state => state)
	
	const [isOpen, setIsOpen] = useState<boolean>(true);
	
	useEffect(() => {
		if (isOpen) document.body.classList.add('scrollbar__body')
		else document.body.classList.remove('scrollbar__body')
	}, [isOpen])

	const router = useRouter()
	const matches = useMediaQuery('(min-width: 1024px)')
	const refDrawer = useRef<HTMLDivElement>(null)

	useOnClickOutside(refDrawer, () => router.push('/'))

  function closeModal(): void {
    setIsOpen(false);
  }

	const content = !order.isPayment ? <CheckoutForm /> : <Payment cart={cart} closeModal={closeModal} />

	return (
		<>
			{matches ? (
				<DrawerDesctop
					ref={refDrawer}
					isOpen={isOpen}
					isPage={true}
					closeDrawer={() => router.back()}
				>
					{cart.length > 0 ? content : <EmptyBasket />}
				</DrawerDesctop>
			) : (
				<DrawerMobile
					ref={refDrawer}
					isOpen={isOpen}
					isPage={true}
					closeDrawer={() => router.back()}
				>
					{cart.length > 0 ? content : <EmptyBasket />}
				</DrawerMobile>
			)}
		</>
	)
}
