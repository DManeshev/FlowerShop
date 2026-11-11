'use client'

import Link from 'next/link'
import clsx from 'clsx';
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMediaQuery } from 'usehooks-ts'
import { useMutation } from '@tanstack/react-query';

import { ICart } from '@/store';
import { useActions } from '@/hooks/useAction';
import { formatPrice } from '@/lib/utils';
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { CheckoutStepType, EnumOrderStatus } from '@/types';

import {
	Drawer,
	DrawerHeader,
	DrawerContent,
	DrawerFooter,
} from "@/components/ui/drawer";
import { MoveLeft, X } from 'lucide-react';
import Payment from './Payment/Payment';
import Delivery from './Delivery/Delivery';
import { Button } from '@/components/ui/button';

import styles from './Checkout.module.scss';

import { OrderForm, OrderRequest, OrderService } from '@/services';

import { CHOOSE_DELIVERY_TYPE_TEXT, CREATE_ORDER_TEXT, listDeliveryType } from './Delivery/Delivery.constants';
import { DeliveryType } from './Delivery/Delivery.types';

export default function Checkout() {
	const [checkoutStep, setCheckoutStep] = useState<CheckoutStepType>('delivery');

	const {
		cart: { cart },
		order: { isOpenCheckoutDrawer, order }
	} = useTypedSelector(state => state);
	const { toggleCheckoutDrawer } = useActions();

	const { mutateAsync } = useMutation({ mutationFn: OrderService.placeOrder })

	const router = useRouter()
	const isDesktop: boolean = useMediaQuery('(min-width: 991px)');

	const {
		setValue,
		handleSubmit,
		watch,
		reset,
		control,
	} = useForm<OrderForm>({
		mode: 'onChange',
		defaultValues: {
			deliveryDate: new Date().toISOString().substring(0, 10),
			name: '',
			phone: '',
			commentary: '',
			city: 'Чебоксары',
			apartment: '',
			street: '',
			entrance: '',
			houseNumber: ''
		}
	});

	const handleClose = (): void => {
		toggleCheckoutDrawer(false);
		setCheckoutStep('delivery');
		reset();
	}

	const total: number = useMemo(() => {
		return cart.reduce((result: number, item: ICart) =>
			result + (item.product.price * item.quantity), 0)
	}, [cart]);

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
		<Drawer
			open={isOpenCheckoutDrawer}
			onOpenChange={toggleCheckoutDrawer}
			swipeDirection={isDesktop ? 'right' : 'down'}
		>
			<DrawerContent className={styles.drawer}>
				<DrawerHeader className={styles.drawer__header}>
					<div className={styles.header}>
						{checkoutStep === 'delivery' ?
							<div className="w-5 h-5 opacity-0" />
							: (
								<button
									onClick={() => setCheckoutStep('delivery')}
									className="w-5 h-5 cursor-pointer"
								>
									<span><MoveLeft size={20} /></span>
								</button>
							)
						}

						<h2 className={styles.header__title}>
							{checkoutStep === 'delivery' ? "Доставка" : ""}
						</h2>

						<button
							onClick={handleClose}
							className={styles.header__close}
						>
							<span>
								<X size={16} />
							</span>
						</button>
					</div>
				</DrawerHeader>

				{checkoutStep === 'delivery' ?
					<div className={styles.types}>
						{listDeliveryType.map((item: DeliveryType, index: number) => (
							<button
								key={`${item}-$${index}`}
								onClick={() => setValue('deliveryMethod', item.value)}
								className={clsx(styles.types__btn, watch('deliveryMethod') === item.value && styles.active__type)}
							>
								<span>{item.label}</span>
							</button>
						))}
					</div>
					: null
				}

				<div className={styles.content}>
					{checkoutStep === 'delivery' ?
						<Delivery
							setCheckoutStep={setCheckoutStep}
							control={control}
							watch={watch}
							handleSubmit={handleSubmit}
						/> : <Payment />
					}
				</div>

				<DrawerFooter>
					{checkoutStep === 'delivery' ? (
						// DELIVERY
						<>
							{watch('deliveryMethod') ? (
								<div className="text-sm mb-2">
									Нажимая «{CREATE_ORDER_TEXT}», Вы подтверждаете, что ознакомились с
									<Link
										href="/privacy"
										target="_blank"
										className="pl-1 text-sm text-(--colorSalmon) underline"
									>
										Политикой конфиденциальности.
									</Link>
								</div>
							) : null}

							<Button
								type="submit"
								form="deliveryForm"
								size="xl"
								className={styles.delivery__btn}
								disabled={!watch('deliveryMethod')}
							>
								<span>{watch('deliveryMethod') ? CREATE_ORDER_TEXT : CHOOSE_DELIVERY_TYPE_TEXT}</span>
							</Button>
						</>
					) : (
						// PAYMENT
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
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
