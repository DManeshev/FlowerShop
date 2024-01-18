import { useState, ChangeEvent, useRef } from 'react'
import Link from 'next/link'
import { Map, Placemark, useYMaps } from '@pbe/react-yandex-maps'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useActions } from '@/hooks/useAction'

import { IOrder } from '@/types/order.interface'
import { timeDeliveryArray } from '@/utils/timeDeliveryArray'

import Field from '@/components/ui/form/input/Input'
import Select from '@/components/ui/form/select/Select'
import Button from '@/components/ui/btn/button/Button'
import Checkbox from '@/components/ui/form/checkbox/Checkbox'
import SubHeading from '@/components/ui/heading/SubHeading'

import styles from '../Checkout.module.scss'

export default function CheckoutForm() {
	const [coords, setCoords] = useState([56.133988, 47.263766])
	const [isNotDelivery, setIsNotDelivery] = useState<boolean>(false)

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IOrder>({
		mode: 'onChange',
		defaultValues: {
			deliveryDate: new Date().toISOString().substring(0, 10),
			flat: '',
			hallway: ''
		}
	})

	const { setOrderValues } = useActions()

	const ymaps = useYMaps()
	const mapRef = useRef(null)
	const placemarkRef = useRef(null)

	const fullAddress = `${watch('address')}, ${watch('flat')}`

	const handleClick = e => {
		const newCoords = e.get('coords')
		setCoords(newCoords)

		ymaps?.geocode(newCoords).then(res => {
			const firstGeoObject = res.geoObjects.get(0)

			const newAddress = [
				firstGeoObject.getLocalities().length
					? firstGeoObject.getLocalities()
					: firstGeoObject.getAdministrativeAreas(),
				firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
				firstGeoObject.getPremiseNumber()
			]
				.filter(Boolean)
				.join(', ')

			placemarkRef.current.getMap().hint.open(newCoords, newAddress)

			setValue('address', newAddress)
		})
	}

	const changeDelivery = (event: ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target

		setIsNotDelivery(checked)

		if (checked) {
			setValue('address', 'Чебоксары, Чебоксарский пр-кт, 27')
			setValue('flat', '')
		} else setValue('address', 'Выберите адрес')
	}

	const checkoutOrder: SubmitHandler<IOrder> = data => {
		setOrderValues({ isPayment: true, isNotDelivery, ...data })
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(checkoutOrder)}>
			<div className={styles.form__container}>
				<h2 className={styles.form__address}>
					{watch('address') ? fullAddress : 'Выберите адрес'}
				</h2>

				<input
					hidden
					type="text"
					className={styles.form__address__input}
					{...register('address', {
						required: 'Выберите адрес'
					})}
				/>

				<div className={styles.form__map}>
					{isNotDelivery && <div className="glass rounded-t-5"></div>}
					<Map
						defaultState={{ center: coords, zoom: 12 }}
						width="100%"
						height="100%"
						instanceRef={mapRef}
						onClick={handleClick}
					>
						<Placemark instanceRef={placemarkRef} geometry={coords} />
					</Map>
				</div>
				{errors.address && (
					<div className={styles.form__error}>{errors.address.message}</div>
				)}

				{watch('address') ? (
					<div className={styles.form__fields}>
						{isNotDelivery ? null : (
							<>
								<Field
									label="Квартира / Офис"
									type="number"
									placeholder="Введите номер квартиры / офиса"
									{...register('flat', {
										required: 'Поле Квартира / Офис обязательное'
									})}
									disabled={isNotDelivery}
									error={errors.flat?.message}
								/>

								<Field
									label="Подъезд"
									type="number"
									placeholder="Введите номер подъезда"
									disabled={isNotDelivery}
									{...register('hallway')}
								/>

								<div className="flex flex-col">
									<label className="text-[12px] px-2">Дата доставки</label>
									<input
										type="date"
										className={styles.form__date}
										disabled={isNotDelivery}
										{...register('deliveryDate', {
											required: 'Поле Дата обязательное'
										})}
									/>
								</div>
							</>
						)}

						<div className="flex flex-col">
							<Select
								label="Время доставки"
								placeholder="Время доставки"
								selectList={timeDeliveryArray}
								handleChange={({ name }) => setValue('deliveryTime', name)}
								{...register('deliveryTime', {
									required: 'Поле Время обязательное'
								})}
								error={errors.deliveryTime?.message}
							/>
						</div>
					</div>
				) : null}

				<Checkbox
					label="Самовызов"
					checked={isNotDelivery}
					onChange={changeDelivery}
				/>

				<p className={styles.form__descr}>
					Доставка осуществляется по г. Чебоксары и по г. Новочебсарск
				</p>
			</div>

			<div className={styles.form__container}>
				<SubHeading title="Общая информация" className="pb-3" />
				<div className={styles.form__fields}>
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

			<div className="text-sm">
				Ваши персональные данные будут использованы для обработки вашего заказа,
				поддержки вашего взаимодействия на этом веб-сайте и для других целей,
				описанных в нашей
				<Link
					href="/privacy"
					target="_blank"
					className="pl-1 text-sm text-[var(--green)] underline"
				>
					политике конфиденциальности.
				</Link>
			</div>

			<Button title="Перейти к оплате" size="large" classes="mt-auto" />
		</form>
	)
}
