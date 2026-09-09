'use client'

import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { useActions } from '@/hooks/useAction';
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { CheckoutStepType } from '@/types';

import { 
    Drawer,
    DrawerHeader,
    DrawerTrigger,
    DrawerContent,
} from "@/components/ui/drawer";
import { MoveLeft, X } from 'lucide-react';
import Payment from './Payment/Payment';
import Delivery from './Delivery/Delivery';

import styles from './Checkout.module.scss';
import { useForm } from 'react-hook-form';
import { OrderForm } from '@/services';
import clsx from 'clsx';
import { listDeliveryType } from './Delivery/Delivery.constants';
import { DeliveryType } from './Delivery/Delivery.types';

export default function Checkout() {
    const [checkoutStep, setCheckoutStep] = useState<CheckoutStepType>('delivery');

	const { order: { isOpenCheckoutDrawer } } = useTypedSelector(state => state)
	const { toggleCheckoutDrawer } = useActions();
	
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
		}
	});

	const handleClose = (): void => {
		toggleCheckoutDrawer(false);
		setCheckoutStep('delivery');
		reset();
	}

	return (
		<Drawer
			open={isOpenCheckoutDrawer}
			onOpenChange={toggleCheckoutDrawer}
			swipeDirection={isDesktop ? 'right' : 'down'}
		>
			<DrawerTrigger
				render={
					<button className={styles.cart__btn}>
						<span>Корзина</span>
					</button>
				}
			/>

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
								className={clsx(styles.types__btn, watch('deliveryMethod') === item.value && styles.active__type )}
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
			</DrawerContent>
		</Drawer>
	)
}
