'use client'

import { ChangeEvent, useState, MouseEvent, useEffect } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { TbTrash } from 'react-icons/tb'
import Image from 'next/image'
import clsx from 'clsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { IProduct } from '@/types/product.interface'
import {
	EnumProductStatus,
	productStatus
} from '@/types/enum/productStatus.enum'
import { IList } from '@/types/list.interface'

import { ProductService } from '@/services/product/product.service'
import { useFlowerQuery } from '@/hooks/useQueries/useFlowerQuery'

import File from '@/components/ui/form/file/File'
import Field from '@/components/ui/form/input/Input'
// import Button from '@/components/ui/btn/button/Button'
// import Select from '@/components/ui/form/select/Select'
import SelectMultiple from '@/components/ui/form/select/SelectMultiple'
import ProductCategory from './ProductCategory'
import { Button } from '@/components/ui/button'

import styles from '../Dashboard.module.scss'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { FieldError, FieldLabel } from '@/components/ui/field'
import { CategoryService } from '@/services/category/category.service'

export default function ProductAction() {
	const searchParams = useSearchParams()
	const productId = searchParams.get('productId')

	const { data: flowers } = useFlowerQuery()

	const [categoryId, setCategoryId] = useState<number>(0)

	const {
		register: formRegister,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
		getValues,
		watch,
		control
	} = useForm<IProduct>({
		mode: 'onChange',
		defaultValues: {
			status: EnumProductStatus.inStock,
			statusName: 'В наличии',
			isDelivery: true,
			isDeliveryName: 'Да',
			flowers: [],
			images: []
		}
	})

	const { isLoading, data: categories } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
		  select: ({ data }) =>
			data.map(item => ({
			  value: String(item.id),
			  label: item.name
			}))
		}
	)

	const { data: subcategories } = useQuery(
		['subcategory', categoryId],
		() => CategoryService.getSubcategoryByCategory(categoryId),
		{
		  select: ({ data }) =>
			data.map(item => ({
			  value: String(item.id),
			  label: item.name
			}))
		}
	)

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
					flowersNames: data.flowers.map(({ name }) => name).join(', ')
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

	const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target
		const formData = new FormData()

		const selectedFiles = files as FileList

		for (const file of selectedFiles) {
			formData.append('files[]', file)
		}

		const { data } = await ProductService.uploadFile(formData)

		const pathImages = data.map(({ Location }) => Location)

		setValue('images', [...getValues('images'), ...pathImages])
	}

	const deleteImage = async (path: string) => {
		let copyImages = getValues('images')

		if (copyImages.includes(path)) {
			copyImages = copyImages.filter(item => item !== path)
		}

		const currentPath = path.split('/').slice(-2).join('/')

		setValue('images', copyImages)
		const { data } = await ProductService.deleteFile({
			path: currentPath
		})
	}

	const handleMultipleSelect = (item: IList) => {
		const flower = { id: Number(item.id), name: item.name }

		let copyFlowers = getValues('flowers')

		const findFlowerInArray = copyFlowers.find(({ id }) => id === flower.id)

		if (findFlowerInArray) {
			copyFlowers = copyFlowers.filter(({ id }) => id !== flower.id)
		} else copyFlowers.push(flower)

		setValue('flowers', copyFlowers)
		setValue('flowersNames', copyFlowers.map(({ name }) => name).join(', '))
	}

	const onSubmit: SubmitHandler<IProduct> = async data => {
		console.log(data, 123123)
		// delete data.categoryName
		// delete data.statusName
		// delete data.flowersNames
		// delete data.subcategoryName

		// if (data.id) {
		// 	const { data: editResponse } = await ProductService.update(data.id, data)
		// 	console.log(editResponse)
		// } else {
		// 	const { data: createResponse } = await ProductService.create(data)
		// 	console.log(createResponse)
		// }
	}

	const deleteProductById = (event: MouseEvent) => {
		event.preventDefault()

		const response = deleteProduct(getValues('id'))
	}

	return (
		<form className={clsx(styles.form)}>
			<Controller
				name='categoryId'
				control={control}
				rules={{ required: 'Поле Категория обязательное' }}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.error?.message}>
						<FieldLabel className={styles.select_field}>Категория</FieldLabel>
						<Select
							items={categories}
							value={field.value ? String(field.value) : ''}
							name={field.name}
							onValueChange={(value) => {
								setCategoryId(Number(value))
								field.onChange(Number(value))
							}}
						>
						<SelectTrigger
							className={styles.select}
							aria-invalid={Boolean(fieldState.error?.message)}
						>
							<SelectValue placeholder='Выберите категорию товара' />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
							{categories && categories.map((item) => (
								<SelectItem key={item.value} value={item.value} className={styles.select_item}>
								{item.label}
								</SelectItem>
							))}
							</SelectGroup>
						</SelectContent>
						</Select>
						<FieldError>{fieldState.error?.message}</FieldError>
					</Field>
				)}
			/>

			{subcategories?.length ?
				<Controller
					name='subcategoryId'
					control={control}
					rules={{ required: 'Поле Подкатегория обязательное' }}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.error?.message}>
							<FieldLabel className={styles.select_field}>Подкатегория</FieldLabel>
							<Select
								items={subcategories}
								value={field.value ? String(field.value) : ''}
								name={field.name}
								onValueChange={(value) => field.onChange(Number(value))}
							>
								<SelectTrigger className={styles.select}>
								<SelectValue placeholder='Выберите подкатегорию товара' />
								</SelectTrigger>
								<SelectContent>
								<SelectGroup>
									{subcategories && subcategories.map((item) => (
									<SelectItem key={item.value} value={item.value} className={styles.select_item}>
										{item.label}
									</SelectItem>
									))}
								</SelectGroup>
								</SelectContent>
							</Select>
							<FieldError>{fieldState.error?.message}</FieldError>
						</Field>
					)}
				/>
			: null}

			<div className={styles.grid__container}>
				<Field
					label="Название"
					placeholder="Введите название"
					{...formRegister('name', {
						required: 'Поле Название обязательное'
					})}
					error={errors.name?.message}
				/>

				<Field
					label="Описание"
					placeholder="Введите описание"
					{...formRegister('description')}
				/>
			</div>

			<div className={styles.grid__container}>
				<Field
					type="number"
					label="Стоимость"
					placeholder="Введите стоимость"
					{...formRegister('price', {
						required: 'Поле Стоимость обязательное',
						valueAsNumber: true
					})}
					error={errors.price?.message}
				/>
			</div>

			<div className={styles.grid__container}>
				<div className="col-span-2 max-sm:col-span-1">
					<File
						multiple
						accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
						onChange={uploadFile}
					/>
					{watch('images').length > 0 ? (
						<div className={styles.images}>
							{watch('images').map((path, index) => (
								<div key={index} className={styles.image}>
									<Image src={path} alt={getValues('name')} fill />

									<div
										className={styles.image__delete}
										onClick={() => deleteImage(path)}
									>
										<TbTrash />
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
			</div>

			<div className={styles.grid__container}>
				<SelectMultiple
					selectList={flowers || []}
					checkedList={watch('flowers')}
					label="Состав букета"
					placeholder="Выберите цветы из которых состоит букет"
					{...formRegister('flowersNames', {
						required: 'Поле Состав букета обязательное'
					})}
					handleChange={item => handleMultipleSelect(item)}
					error={errors.flowersNames?.message}
				/>
			</div>

			{/* <div className={styles.grid__container}>
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

			<div className={styles.form__btns}>
				{productId ? (
					<Button
						title="Удалить"
						className="max-sm:ml-0 max-sm:w-full bg-red-600"
						onClick={deleteProductById}
					/>
				) : null}

				<Button
					className="max-sm:ml-0 max-sm:w-full"
					onClick={handleSubmit(onSubmit)}
				>
					<span>Сохранить</span>
				</Button>
			</div>
		</form>
	)
}
