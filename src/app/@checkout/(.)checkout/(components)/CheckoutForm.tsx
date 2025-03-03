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
import { EnumDeliveryMethod } from '@/types/enum/orderStatus.enum'

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
      deliveryMethod: EnumDeliveryMethod.delivery
		}
	})

	const { setOrderValues } = useActions()

	const ymaps = useYMaps()
	const mapRef = useRef(null)
	const placemarkRef = useRef(null)

	const fullAddress = `${watch('city')}, ${watch('street')}, ${watch('houseNumber')}`

	const handleClick = (e: any) => {
		const newCoords = e.get('coords')
		setCoords(newCoords)

		ymaps?.geocode(newCoords).then(res => {
			const firstGeoObject = res.geoObjects.get(0)

			const newAddress = [
				/* @ts-ignore */
				firstGeoObject.getLocalities().length
					? /* @ts-ignore */
					  firstGeoObject.getLocalities()
					: /* @ts-ignore */
					  firstGeoObject.getAdministrativeAreas(),
				/* @ts-ignore */
				firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
				/* @ts-ignore */
				firstGeoObject.getPremiseNumber()
			]
				.filter(Boolean)
				.join(', ')

			if (placemarkRef.current)
				/* @ts-ignore */
				placemarkRef.current.getMap().hint.open(newCoords, newAddress)

      /* @ts-ignore */
      const city = firstGeoObject.getLocalities()
      /* @ts-ignore */
      const street = firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
      /* @ts-ignore */
      const houseNumber = firstGeoObject.getPremiseNumber()

			setValue('city', city[0] || 'Чебоксары')
			setValue('street', street)
			setValue('houseNumber', houseNumber)
		})
	}

	// const changeDelivery = (event: ChangeEvent<HTMLInputElement>) => {
	// 	const { checked } = event.target

	// 	setIsNotDelivery(checked)

	// 	if (checked) {
	// 		setValue('address', 'Чебоксары, Стартовая, 3')
	// 		setValue('flat', '')
	// 	} else setValue('address', 'Выберите адрес')
	// }

	const checkoutOrder: SubmitHandler<IOrder> = data => {
		setOrderValues({ isPayment: true, ...data })
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(checkoutOrder)}>
			<div className={styles.form__container}>
				<h2 className={styles.form__address}>
					{watch('street') ? fullAddress : 'Выберите улицу'}
				</h2>

				<input
					hidden
					type="text"
					className={styles.form__address__input}
					{...register('street', {
						required: 'Выберите улицу'
					})}
				/>

				<div className={styles.form__map}>
					{isNotDelivery && <div className="glass rounded-t-5"></div>}
					<Map
						defaultState={{ center: coords, zoom: 12 }}
						width="100%"
						height="100%"
						/* @ts-ignore */
						instanceRef={mapRef}
						onClick={handleClick}
					>
						{/* @ts-ignore */}
						<Placemark instanceRef={placemarkRef} geometry={coords} />
					</Map>
				</div>
				{errors.street && (
					<div className={styles.form__error}>{errors.street.message}</div>
				)}

				{/* {watch('address') ? ( */}
					<div className={styles.form__fields}>

							<>
								<Field
									label="Квартира / Офис"
									type="number"
									placeholder="Номер квартиры / офиса"
									{...register('apartment', {
										required: 'Поле Квартира / Офис обязательное'
									})}
									disabled={isNotDelivery}
									error={errors.apartment?.message}
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
				{/* // ) : null} */}

				{/* <Checkbox
					label="Забрать с магазина"
					checked={isNotDelivery}
					onChange={changeDelivery}
				/>

				<p className={styles.form__descr}>
					Доставка осуществляется по г. Чебоксары и по г. Новочебсарск
				</p> */}
			</div>

			<div className={styles.form__container}>
				<SubHeading title="Общая информация" className="pb-3" />
				<div className={styles.form__fields}>
					<Field
						label="Имя"
						placeholder="Имя"
						{...register('name', {
							required: 'Поле Имя обязательное'
						})}
						error={errors.name?.message}
					/>
					<Field
						label="Номер телефона"
						type="tel"
						placeholder="Номер телефона"
						{...register('phone', {
							required: 'Поле Номер телефона обязательное'
						})}
						error={errors.phone?.message}
					/>
          <Field
            label="Комментарий к заказу"
            placeholder="Комментарий к заказу"
            {...register('commentary')}
          />
				</div>
			</div>

			<div className="text-sm">
				Ваши персональные данные будут использованы для обработки вашего заказа,
				поддержки вашего взаимодействия на этом веб-сайте и для других целей,
				описанных в нашей
				<Link
					href="/privacy"
					target="_blank"
					className="pl-1 text-sm text-[var(--purple)] underline"
				>
					политике конфиденциальности.
				</Link>
			</div>

			<Button title="Перейти к оплате" size="large" classes="mt-auto" />
		</form>
	)
}
