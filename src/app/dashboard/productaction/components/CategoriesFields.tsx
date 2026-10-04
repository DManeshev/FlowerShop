import { useQuery } from '@tanstack/react-query';
import { Control, Controller } from 'react-hook-form';

import { CategoryService, ICategory, IProductForm } from '@/services';
import { SelectType } from '@/types';

import { FieldLabel, FieldError } from '@/components/ui/field';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import styles from '../../Dashboard.module.scss';

interface CategoriesFieldsProps {
    control: Control<IProductForm>
    categoryId: number
}

export const CategoriesFields = ({
    control,
    categoryId,
}: CategoriesFieldsProps) => {
    
    const { data: categories } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
		  select: (data: Array<ICategory>) =>
			data.map((item: ICategory) => ({
			  value: String(item.id),
			  label: item.name
			}))
		}
	)

    const { data: subcategories } = useQuery({
        queryKey: ['subcategory', categoryId],
        queryFn: () => CategoryService.getSubcategoryByCategory(categoryId),
        enabled: !!categoryId,
        select: ({ data }) =>
            data.map((item: ICategory) => ({
            value: String(item.id),
            label: item.name
            })),
    })

    return (
        <div className={styles.categories}>
            <Controller
                name='categoryId'
                control={control}
                rules={{ required: 'Поле Категория обязательное' }}
                render={({ field, fieldState }) => (
                    <div>
                        <FieldLabel>Категория</FieldLabel>
                        <Select
                            items={categories}
                            value={field.value ? String(field.value) : ''}
                            name={field.name}
                            onValueChange={(value) => field.onChange(Number(value))}
                        >
                            <SelectTrigger
                                className={styles.select}
                                aria-invalid={Boolean(fieldState.error?.message)}
                            >
                                <SelectValue placeholder='Выберите категорию товара' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                {categories && categories.map((item: SelectType) => (
                                    <SelectItem key={item.value} value={item.value} className={styles.select_item}>
                                    {item.label}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </div>
                )}
            />

            {subcategories?.length ?
                <Controller
                    name='subcategoryId'
                    control={control}
                    rules={{ required: 'Поле Подкатегория обязательное' }}
                    render={({ field, fieldState }) => (
                        <div>
                            <FieldLabel>Подкатегория</FieldLabel>
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
                                        {subcategories && subcategories.map((item: SelectType) => (
                                        <SelectItem key={item.value} value={item.value} className={styles.select_item}>
                                            {item.label}
                                        </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldError>{fieldState.error?.message}</FieldError>
                        </div>
                    )}
                />
            : null}
        </div>
    )
}