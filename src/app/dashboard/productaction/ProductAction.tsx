'use client'

import { useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { MouseEvent, useEffect } from 'react'

import clsx from 'clsx'

import { ProductService, IProductForm } from '@/services'
import { EnumProductStatus, productStatus } from '@/types/enum/productStatus.enum'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

import styles from '../Dashboard.module.scss'

import { CategoriesFields } from './components/CategoriesFields'
import { FilesField } from './components/FilesFields'

import { FlowersField } from './components/FlowersField'
import { Textarea } from '@/components/ui/textarea'

export default function ProductAction() {
	const searchParams = useSearchParams()
	const productId = searchParams.get('productId')

	const { handleSubmit, reset, getValues, watch, setValue, control } = useForm<IProductForm>({
		mode: 'onChange',
		defaultValues: {
			status: EnumProductStatus.inStock,
			statusName: 'В наличии',
			isDelivery: true,
			isDeliveryName: 'Да',
			images: [],
			name: '',
			description: '',
			price: 0,
			flowers: [],
		}
	})

	const { mutate: getProduct } = useMutation(
		['product by id'],
		(productId: string) => ProductService.getById(productId),
		{
			onSuccess({ data }) {
				reset({
					...data,
					categoryName: String(data.categoryId),
					statusName: data.status,
					isDeliveryName: data.isDelivery ? 'Да' : 'Нет',
				})
			}
		}
	)

	const { mutate: deleteProduct } = useMutation(
		['delete by id'],
		(id: string | number) => ProductService.delete(id),
		{
			onSuccess({ data }) {
				console.log(data)
			}
		}
	)

	useEffect(() => {
		if (productId) getProduct(productId)
	}, [productId])

	const onSubmit: SubmitHandler<IProductForm> = async data => {
		const {
			categoryName,
			subcategoryName,
			statusName,
			...rest
		} = data

		if (data.id) {
			await ProductService.update(data.id, rest)
		} else {
			await ProductService.create(rest)
		}
	}

	const deleteProductById = (event: MouseEvent) => {
		event.preventDefault()

		deleteProduct(getValues('id'))
	}

	return (
		<div>
			<form className={clsx(styles.form)}>
				<CategoriesFields control={control} categoryId={watch('categoryId')} />

				<div className={styles.container}>
					<Controller 
						name='name'
						control={control}
						rules={{ required: 'Поле Название обязательное' }}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Название</FieldLabel>
								<Input
									{...field}
									placeholder="Введите название"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</Field>
						)}
					/>

					<Controller 
						name='price'
						control={control}
						rules={{ required: 'Поле Стоимость обязательное' }}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Стоимость</FieldLabel>
								<Input
									{...field}
									type='number'
									placeholder="Введите стоимость"
									aria-invalid={fieldState.invalid}
								/>
								<FieldError>{fieldState.error?.message}</FieldError>
							</Field>
						)}
					/>

					<FlowersField control={control} />

					<Controller 
						name='description'
						control={control}
						render={({ field }) => (
							<Field>
								<FieldLabel>Описание</FieldLabel>
								<Textarea
									{...field}
									placeholder="Введите описание"
								/>
							</Field>
						)}
					/>
				</div>

				<FilesField
					watch={watch}
					setValue={setValue}
					getValues={getValues}
				/>

				<div className={styles.form__btns}>
					{productId ? (
						<Button
							onClick={deleteProductById}
							size="xl"
							variant="destructive"
							className={styles.btn}
						>
							<span>Удалить</span>
						</Button>
					) : null}

					<Button
						onClick={handleSubmit(onSubmit)}
						size="xl"
						className={styles.btn}
					>
						<span>Сохранить</span>
					</Button>
				</div>
			</form>
		</div>
	)
}

{/* <div className={styles.container}>
<Select
	selectList={productStatus}
	label="Статус заказа"
	{...formRegister('statusName', {
		required: 'Поле Статус обязательное'
	})}
	handleChange={({ id, name }) => {
		setValue('status', id as EnumProductStatus)
		setValue('statusName', name)
	}}
	placeholder="Выберите статус товара"
	error={errors.status?.message}
/>
<Select
	selectList={[
		{ name: 'Да', id: 'true' },
		{ name: 'Нет', id: 'false' }
	]}
	label="Доставка"
	placeholder="Осуществляется ли доставка"
	{...formRegister('isDeliveryName')}
	handleChange={({ id, name }) => {
		setValue('isDelivery', id === 'true')
		setValue('isDeliveryName', name)
	}}
/>
</div> */}
