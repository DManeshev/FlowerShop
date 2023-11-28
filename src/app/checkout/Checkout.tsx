'use client'

import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useAction'

import { OrderService } from '@/services/order/order.service'
import { IOrder } from '@/types/order.interface'

import SubHeading from '@/components/ui/heading/SubHeading'
import CustomLink from '@/components/ui/btn/link/Link'
import CheckoutProduct from './(components)/CheckoutProduct'
import CheckoutForm from './(components)/CheckoutForm'

import styles from './Checkout.module.scss'
import { useCallback } from 'react'

interface ICheckout {}

export default function Checkout({}: ICheckout) {
	const { cart } = useTypedSelector(state => state.cart)

	const { mutate } = useMutation(OrderService.placeOrder)
	const router = useRouter()

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		getValues,
		formState: { errors }
	} = useForm<IOrder>({
		mode: 'onChange',
		defaultValues: {
			delivery: 'Самовызов',
			deliveryDate: new Date().toISOString().substring(0, 10)
		}
	})

	if (cart.length === 0)
		return (
			<div className="container grid place-content-center">
				<SubHeading title="Добавьте товар в корзину" />
				<CustomLink title="Добавить" link="/bouquet" />
			</div>
		)

	const checkoutOrder: SubmitHandler<IOrder> = useCallback(
		data => {
			const order = {
				...data,
				items: cart.map(({ product, quantity }) => ({
					productId: product.id,
					price: product.price,
					quantity
				}))
			}

			mutate(order, {
				onSuccess: ({ data }, variables, context) => {
					router.push(data.confirmation.confirmation_url)
				},
				onError: (error, variables, context) => {
					console.log('error')
				}
			})
		},
		[mutate]
	)

	return (
		<main className="container py-5">
			<form className={styles.wrapper} onSubmit={handleSubmit(checkoutOrder)}>
				{/* Информация */}
				<CheckoutForm
					register={register}
					errors={errors}
					setValue={setValue}
					watch={watch}
				/>

				{/* Заказ */}
				<CheckoutProduct cart={cart} delivery={getValues('delivery')} />
			</form>
		</main>
	)
}
