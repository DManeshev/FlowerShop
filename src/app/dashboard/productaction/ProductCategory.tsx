import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { CategoryService } from '@/services/category/category.service'
import { IProduct } from '@/types/product.interface'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, } from '@/components/ui/select'

import styles from '../Dashboard.module.scss'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

interface IProductCategory {
  register: UseFormRegister<IProduct>
  setValue: UseFormSetValue<IProduct>
  errorMessage: string | undefined
}

export default function ProductCategory({
  errorMessage,
  setValue,
  register
}: IProductCategory) {
  const [categoryId, setCategoryId] = useState<number>(0)

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

  const selectCategory = (categoryId: unknown) => {
    const categoryItem = categories?.find(({ value }) => value === categoryId);
   
    if (!categoryItem) return

    setCategoryId(Number(categoryItem.value))
    setValue('categoryId', Number(categoryItem.value))
    setValue('categoryName', categoryItem.label)
  }

  // handleChange={({ id, name }) => {
  //   setCategoryId(Number(id))
  //   setValue('subcategoryId', Number(id))
  //   setValue('subcategoryName', name)
  // }}
  return (
    <div className={styles.grid__container}>
      {/* <Field data-invalid={errorMessage}>
        <FieldLabel className={styles.select_field}>Категория</FieldLabel>
        <Select
          items={categories}
          {...register('categoryName', { required: 'Поле Категория обязательное' })}
          onValueChange={(value) => selectCategory(value)}
        >
          <SelectTrigger
            className={styles.select}
            aria-invalid={Boolean(errorMessage)}
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
        <FieldError>{errorMessage}</FieldError>
      </Field> */}

      {/* {subcategories?.length ? (
        <Field>
          <FieldLabel className={styles.select_field}>Подкатегория</FieldLabel>
          <Select
            items={subcategories}
            {...register('subcategoryName', { required: 'Поле Подкатегория обязательное' })}
            // onValueChange={(value) => selectCategory(value)}
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
          <FieldError>{errorMessage}</FieldError>
        </Field>
      ) : null} */}
    </div>
  )
}
