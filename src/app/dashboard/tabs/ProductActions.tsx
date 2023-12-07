import { ChangeEvent, useState, MouseEvent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TbTrash } from 'react-icons/tb'
import Image from 'next/image'
import clsx from 'clsx'

import { IProduct } from '@/types/product.interface'
import {
	EnumProductStatus,
	productStatus
} from '@/types/enum/productStatus.enum'
import { IList } from '@/types/list.interface'

import { ProductService } from '@/services/product/product.service'
import { useFlowerQuery } from '@/hooks/useQueries/useFlowerQuery'
import { useProductQuery } from '@/hooks/useQueries/useProductQuery'
import { productCategoryFind, productStatusFind } from '@/utils/statusFind'

import File from '@/components/ui/form/file/File'
import Field from '@/components/ui/form/input/Input'
import Button from '@/components/ui/btn/button/Button'
import Select from '@/components/ui/form/select/Select'
import SubHeading from '@/components/ui/heading/SubHeading'
import SelectMultiple from '@/components/ui/form/select/SelectMultiple'

import styles from '../Dashboard.module.scss'
import { useMutation } from '@tanstack/react-query'

interface IProductActions {
	action: 'create' | 'edit'
}

export default function ProductActions({ action }: IProductActions) {
	const [selectedProduct, setSelectedProduct] = useState<string>('')

	const { data: flowers } = useFlowerQuery()
	const { data } = useProductQuery({
		enabled: !!(action === 'edit')
	})
	const { mutate } = useMutation(
		['product by id'],
		(productId: string) => ProductService.getById(productId),
		{
			onSuccess({ data }) {
				reset({
					...data,
					// categoryName: productCategoryFind(data.categoryId),
					statusName: productStatusFind(data.status),
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

	const {
		register: formRegister,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
		getValues,
		watch
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

		// console.log(data)
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

	const getProduct = (item: IList) => {
		const { id, name } = item

		mutate(id)
		setSelectedProduct(name)
	}

	const onSubmit: SubmitHandler<IProduct> = async data => {
		// delete data.categoryName
		delete data.statusName
		delete data.flowersNames
		delete data.isDeliveryName

		if (data.id) {
			const { data: editResponse } = await ProductService.update(data.id, data)
			console.log(editResponse)
		} else {
			const { data: createResponse } = await ProductService.create(data)
			console.log(createResponse)
		}
	}

	const deleteProductById = (event: MouseEvent) => {
		event.preventDefault()

		const response = deleteProduct(getValues('id'))
	}

	return (
		<>
			{action === 'edit' ? (
				<div className="mb-5">
					<Select
						selectList={
							data
								? data.products.map(item => ({
										id: String(item.id),
										name: item.name
								  }))
								: []
						}
						label="Продукт"
						value={selectedProduct}
						handleChange={item => getProduct(item)}
						placeholder="Выберите продукт для редактирования"
					/>
				</div>
			) : null}
			<form
				className={clsx(
					styles.form,
					action === 'edit' &&
						selectedProduct.length === 0 &&
						styles.form__disabled
				)}
			>
				<SubHeading
					title="Основаная информация"
					className="!pb-3 text-[var(--green)]"
				/>
				<div className={styles.grid__container}>
					<Field
						label="Наименование"
						placeholder="Введите наименование"
						{...formRegister('name', {
							required: 'Поле Наименование обязательное'
						})}
						error={errors.name?.message}
					/>
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
					<div className="col-span-2 max-sm:col-span-1">
						<Field
							label="Описание"
							placeholder="Введите описание"
							{...formRegister('description')}
						/>
					</div>
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

				<SubHeading title="Категория" className="!pb-3 text-[var(--green)]" />
				<div className={styles.grid__container}>
					{/* <Select
						selectList={productCategory}
						label="Категория"
						{...formRegister('categoryName', {
							required: 'Поле Категория обязательное'
						})}
						handleChange={({ id, name }) => {
							setValue('categoryId', id)
							setValue('categoryName', name)
						}}
						placeholder="Выберите категорию товара"
						error={errors.categoryName?.message}
					/> */}
					{/* <Field
						label="Подкатегория"
						placeholder="Введите подкатегорию"
						{...formRegister('subCategory', {
							required: 'Поле Подкатегория обязательное'
						})}
						error={errors.subCategory?.message}
					/> */}

					{/* {watch('category') === EnumCategory.BOUQUET ? (
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
					) : null} */}
				</div>

				<SubHeading title="Прочее" className="!pb-3 text-[var(--green)]" />
				<div className={styles.grid__container}>
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
				</div>

				<div className={styles.form__btns}>
					{action === 'edit' ? (
						<Button
							title="Удалить"
							size="large"
							theme="red"
							classes="max-sm:ml-0 max-sm:w-full"
							onClick={deleteProductById}
						/>
					) : null}

					<Button
						title="Сохранить"
						size="large"
						classes="max-sm:ml-0 max-sm:w-full"
						onClick={handleSubmit(onSubmit)}
					/>
				</div>
			</form>
		</>
	)
}
