import { useState, useEffect, ChangeEvent, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form'
import { useDebounce, useOnClickOutside } from 'usehooks-ts'

import { AddressService } from '@/services/addresses/address.service'

import { EnumDelivery } from '@/types/enum/delivery.enum'
import { IOrder } from '@/types/order.interface'
import timeInterval from '@/utils/timeInterval'

import Field from '@/components/ui/form/input/Input'
import Select from '@/components/ui/form/select/Select'
import SubHeading from '@/components/ui/heading/SubHeading'

import styles from '../Checkout.module.scss'
import selectStyles from '@/components/ui/form/select/Select.module.scss'

interface ICheckoutForm {
	register: UseFormRegister<IOrder>
	errors: FieldErrors<IOrder>
	setValue: UseFormSetValue<IOrder>
	watch: UseFormWatch<IOrder>
}

const tab = [
	{ label: 'Самовызов', id: EnumDelivery.SELFCALL },
	{ label: 'Доставка', id: EnumDelivery.SHIPPING }
]

export default function CheckoutForm({
	register,
	errors,
	setValue,
	watch
}: ICheckoutForm) {
	const [isWrongCity, setIsWrongCity] = useState<boolean>(false)
	const [addresses, setAddresses] = useState<any[]>([])
	const [delivery, setDelivery] = useState<string>(EnumDelivery.SELFCALL)

	const debouncedValue = useDebounce<string>(watch('delivery'), 1000)
	const refModal = useRef<HTMLInputElement>(null)

	const setAddressDelivery = (address: any) => {
		if (
			address.data.city === 'Чебоксары' ||
			address.data.city === 'Новочебоксарск'
		)
			setIsWrongCity(false)
		else setIsWrongCity(true)
		
		setValue('delivery', address.value)
	}

	useOnClickOutside(refModal, () => setAddresses([]))

	useEffect(() => {
		const search = async () => {
			let result = []

			if (debouncedValue) {
				const res = await AddressService.getAddresses({
					query: watch('delivery')
				})

				result = res || []
			}

			setAddresses(result)
		}

		search()
	}, [debouncedValue])

	const handleDelivery = (id: EnumDelivery) => {
		if (id === EnumDelivery.SELFCALL) setValue('delivery', 'Самовызов')
		else setValue('delivery', '')

		setDelivery(id)
	}

	const deliveryTabs: any = {
		selfСall: () => (
			<>
				<div>
					<label className="text-[12px] px-2">Дата</label>
					<input
						type="date"
						className={styles.date}
						{...register('deliveryDate', {
							required: 'Поле Дата обязательное'
						})}
					/>
				</div>
				<div>
					<Select
						label="Время"
						placeholder="Время"
						selectList={timeInterval}
						handleChange={({ value }) => setValue('deliveryTime', value)}
						{...register('deliveryTime', {
							required: 'Поле Время обязательное'
						})}
						error={errors.deliveryTime?.message}
					/>
				</div>
				<p className={styles.selfcall}>
					Ваш букет будет ждать вас по адресу: г. Чебоксары, Чебоксарский пр-кт,
					27
				</p>
			</>
		),
		shipping: () => (
			<>
				<div className="relative col-span-4">
					<Field
						placeholder="Введите адрес доставки"
						{...register('delivery', {
							required: 'Поле Адрес обязательное'
						})}
						error={errors.delivery?.message}
					/>

					{addresses.length !== 0 && (
						<div className={selectStyles.modal} ref={refModal}>
							{addresses.map(item => (
								<div
									className={selectStyles.modal__item}
									onClick={() => setAddressDelivery(item)}
									key={item.value}
								>
									{item.value}
								</div>
							))}
						</div>
					)}
					<p className={styles.address__descr}>
						Доставка осуществляется по г. Чебоксары или г. Новочебсарск
					</p>
					{isWrongCity && (
						<p className="text-[12px] text-[var(--red)] font-semibold pl-2">
							Доставка в данный город не осуществляется
						</p>
					)}
				</div>
				<div>
					<label className="text-[12px] px-2">Дата доставки</label>
					<input
						type="date"
						className={styles.date}
						{...register('deliveryDate', {
							required: 'Поле Дата обязательное'
						})}
					/>
				</div>
				<div>
					<Select
						label="Время доставки"
						placeholder="Время доставки"
						selectList={timeInterval}
						handleChange={({ value }) => setValue('deliveryTime', value)}
						{...register('deliveryTime', {
							required: 'Поле Время обязательное'
						})}
						error={errors.deliveryTime?.message}
					/>
				</div>
			</>
		)
	}

	return (
		<section>
			<div className={styles.info}>
				<SubHeading title="Общая информация" />
				<div className="grid grid-cols-2 gap-x-5 gap-y-3">
					<Field
						label="Имя"
						placeholder="Введите имя"
						{...register('name', {
							required: 'Поле Имя обязательное'
						})}
						error={errors.name?.message}
					/>
					<Field
						label="Номер телефона"
						type="tel"
						placeholder="Введите номер телефона"
						{...register('phone', {
							required: 'Поле Номер телефона обязательное'
						})}
						error={errors.phone?.message}
					/>
					<div className="col-span-2">
						<Field
							label="Комментарий к заказу"
							placeholder="Введите комментарий к заказу"
							{...register('commentary')}
						/>
					</div>
				</div>
			</div>

			<div className={styles.info}>
				<SubHeading title="Доставка" />
				<div className="flex items-center gap-x-5 gap-y-3 mb-5">
					{tab.map(({ id, label }) => (
						<div
							key={id}
							className={styles.tab}
							onClick={() => handleDelivery(id)}
						>
							{label}
							{delivery === id ? (
								<motion.div
									className={styles.tab__underline}
									layoutId="underline"
								/>
							) : null}
						</div>
					))}
				</div>
				<AnimatePresence mode="wait">
					<motion.div
						className="grid grid-cols-4 gap-3"
						key={delivery ? deliveryTabs[delivery] : 'empty'}
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{deliveryTabs[delivery]()}
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="col-span-2 flex gap-2">
				<div className="text-sm">
					Ваши персональные данные будут использованы для обработки вашего
					заказа, поддержки вашего взаимодействия на этом веб-сайте и для других
					целей, описанных в нашей
					<Link
						href="/privacy"
						target="_blank"
						className="pl-1 text-sm text-[var(--green)] underline"
					>
						политике конфиденциальности.
					</Link>
				</div>
			</div>
		</section>
	)
}
