import Link from 'next/link'
import clsx from 'clsx'
import { useState, Dispatch, SetStateAction } from 'react'
import { useQuery } from '@tanstack/react-query'

import { useDebounceCallback } from 'usehooks-ts'
import { SubmitHandler, Controller, Control, UseFormWatch, UseFormHandleSubmit } from 'react-hook-form'

import { useActions } from '@/hooks/useAction'
import { AddressService } from '@/services/address/address.service'

import { OrderForm } from '@/services'
import { CheckoutStepType, SelectType } from '@/types'
import { DeliveryCity } from './Delivery.types'
import { EnumDeliveryMethod } from '@/types/enum/orderStatus.enum'
import { SearchAddress } from '@/services/address/address.interface'
import {
	CHOOSE_DELIVERY_TYPE_TEXT,
	CREATE_ORDER_TEXT,
	DELIVERY_PICKUP_TIME_TEXT,
	DELIVERY_TIME_TEXT,
	generateListTimeSlots,
	listDeliveryCity
} from './Delivery.constants'

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { InputGroupAddon } from '@/components/ui/input-group'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox'

import styles from './Delivery.module.scss';

interface DeliveryFormProps {
	setCheckoutStep: Dispatch<SetStateAction<CheckoutStepType>>;

	control: Control<OrderForm, any>;
	watch: UseFormWatch<OrderForm>;
	handleSubmit: UseFormHandleSubmit<OrderForm, undefined>
}

export default function DeliveryForm({ setCheckoutStep, control, watch, handleSubmit }: DeliveryFormProps) {
	const { setOrder } = useActions();

	const [streetValue, setStreetValue] = useState<string>('');
	const [coords, setCoords] = useState(listDeliveryCity[0].coords);

	const debounced = useDebounceCallback(setStreetValue, 500);

	const isPickup: boolean = watch('deliveryMethod') === EnumDeliveryMethod.pickup;

	const setCurrentCoords = (city: string) :void => {
		const deliveryCity: DeliveryCity | undefined = listDeliveryCity.find(({ value }) => value === city);

		if (deliveryCity) setCoords(deliveryCity.coords)
	}

	const { data: listDeliveryStreets } = useQuery(
		['address', streetValue],
		() => AddressService.searchAddress({ text: streetValue, ll: coords.join(', '), results: '10' }),
		{
			enabled: streetValue.length >= 3,
			select: ({ results }) => results.map((item: SearchAddress) => item.title.text)
		}
	)

	const checkoutOrder: SubmitHandler<OrderForm> = (data: OrderForm) => {
		setOrder(data)
		setCheckoutStep('payment');
	}

	return (
		<div className={styles.delivery}>
			{watch('deliveryMethod') ? (
				<form
					id="deliveryForm"
					onSubmit={handleSubmit(checkoutOrder)}
					className={styles.form}
				>
					<FieldGroup className={styles.form__fields}>
						<Controller
							name='name'
							control={control}
							rules={{ required: 'Поле Имя обязательное' }}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid} className={styles.field}>
									<FieldLabel>Имя</FieldLabel>
									<Input {...field} aria-invalid={fieldState.invalid} placeholder="Имя" autoComplete="off" />
								</Field>
							)}
						/>

						<Controller
							name='phone'
							control={control}
							rules={{ required: 'Поле Номер телефона обязательное' }}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid} className={styles.field}>
									<FieldLabel>Номер телефона</FieldLabel>
									<Input {...field} type='tel' aria-invalid={fieldState.invalid} placeholder="Номер телефона" autoComplete="off" />
								</Field>
							)}
						/>

						<Controller
							name='commentary'
							control={control}
							render={({ field }) => (
								<Field className={styles.field}>
									<FieldLabel>Комментарий</FieldLabel>
									<Input {...field} placeholder="Комментарий к заказу" autoComplete="off" />
								</Field>
							)}
						/>
					</FieldGroup>

					<FieldGroup className={styles.form__grid}>
						<Controller
							name='deliveryDate'
							control={control}
							rules={{ required: 'Поле Дата обязательное' }}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid} className={clsx(styles.field, 'col-span-6')}>
									<FieldLabel>Дата {isPickup ? DELIVERY_PICKUP_TIME_TEXT : DELIVERY_TIME_TEXT}</FieldLabel>
									<Input {...field} type="date" aria-invalid={fieldState.invalid} />
								</Field>
							)}
						/>

						<Controller
							name='deliveryTime'
							control={control}
							rules={{ required: 'Поле Время обязательное' }}
							render={({ field, fieldState }) => (
								<Field className={clsx(styles.field, 'col-span-6')} data-invalid={fieldState.invalid} >
									<FieldLabel>Время {isPickup ? DELIVERY_PICKUP_TIME_TEXT : DELIVERY_TIME_TEXT}</FieldLabel>
									<Select
										items={generateListTimeSlots()}
										value={field.value ? String(field.value) : ''}
										name={field.name}
										onValueChange={(value) => field.onChange(String(value))}
										data-invalid={fieldState.invalid}
									>
										<SelectTrigger aria-invalid={fieldState.invalid} className={styles.select}>
											<SelectValue placeholder="Выберите время" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{generateListTimeSlots().map((item: SelectType) => (
													<SelectItem key={item.value} value={item.value} className={styles.select_item}>
														{item.label}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
							)}
						/>
					</FieldGroup>

					{isPickup ? (
						<div className={styles.pickup__text}>
							<span>Заказ будет выдан в магазине по адресу: </span>
							<span className={styles.pickup__address}>г. Чебоксары, ул. Стартовая, д. 3</span>
						</div>
					) : null}

					{ watch('deliveryMethod') && <Separator className='my-5' /> }

					{ !isPickup ? (
						<div>
							<Controller
								name='city'
								control={control}
								rules={{ required: 'Поле Город доставки обязательное' }}
								render={({ field, fieldState }) => (
									<Field className={styles.field} data-invalid={fieldState.invalid}>
										<FieldLabel>Город доставки</FieldLabel>
										<Select
											items={listDeliveryCity}
											value={field.value ? String(field.value) : ''}
											name={field.name}
											onValueChange={(value) => {
												setCurrentCoords(String(value))
												field.onChange(String(value))
											}}
											data-invalid={fieldState.invalid}
										>
											<SelectTrigger aria-invalid={fieldState.invalid} className={styles.select}>
												<SelectValue placeholder="Выберите город" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{listDeliveryCity.map((item: SelectType) => (
														<SelectItem key={item.value} value={item.value}>
															{item.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</Field>
								)}
							/>

							<FieldGroup className={styles.form__grid}>
								<Controller
									name='street'
									control={control}
									rules={{ required: 'Поле Улица обязательное' }}
									render={({ field, fieldState }) => (
										<Field className={clsx(styles.field, 'col-span-6 max-sm:col-span-1')} data-invalid={fieldState.invalid}>
											<FieldLabel>Улица</FieldLabel>
											<Combobox
												items={listDeliveryStreets}
												value={field.value}
												onValueChange={(value: string | null) => field.onChange(value ?? '')}
												filter={null}
											>
												<ComboboxInput
													onInput={event => debounced(event.currentTarget.value)}
													aria-invalid={fieldState.invalid}
													placeholder='Введите и выберите адрес доставки'
												>
													<InputGroupAddon>
														<Search />
													</InputGroupAddon>
												</ComboboxInput>
												<ComboboxContent>
													<ComboboxEmpty>Адрес не найден</ComboboxEmpty>
													<ComboboxList>
														{(street, index) => (
															<ComboboxItem key={`${street.value}-${index}`} value={street}>
																{street}
															</ComboboxItem>
														)}
													</ComboboxList>
												</ComboboxContent>
											</Combobox>
										</Field>
									)}
								/>

								<Controller
									name='apartment'
									control={control}
									rules={{ required: 'Поле Квартира / Офис обязательное' }}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid} className={clsx(styles.field, 'col-span-3 max-sm:col-span-1')}>
											<FieldLabel>Квартира / Офис</FieldLabel>
											<Input {...field} aria-invalid={fieldState.invalid} placeholder="Квартира / Офис" autoComplete="off" />
										</Field>
									)}
								/>

								<Controller
									name='entrance'
									control={control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid} className={clsx(styles.field, 'col-span-3 max-sm:col-span-1')}>
											<FieldLabel>Подъезд</FieldLabel>
											<Input {...field} aria-invalid={fieldState.invalid} placeholder="Подъезд" autoComplete="off" />
										</Field>
									)}
								/>
							</FieldGroup>
						</div>
					) : null}
				</form>
			) : null}

			{watch('deliveryMethod') ? (
				<div className="text-sm mb-2">
					Нажимая «{CREATE_ORDER_TEXT}», Вы подтверждаете, что ознакомились с
					<Link
						href="/privacy"
						target="_blank"
						className="pl-1 text-sm text-(--main-color) underline"
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
		</div>
	)
}
