import { useState } from 'react'
import { useQueryClient, useMutation, QueryClient } from '@tanstack/react-query'

import { CategoryService, ICategory, ICreateSubcategory } from '@/services'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Flower2, Plus, X } from 'lucide-react'

import styles from '../styles.module.scss'

const formatIndex = (value: number) => String(value).padStart(2, '0')

function EmptyState({ title, text }: { title: string; text: string }) {
	return (
		<div className={styles.placeholder}>
			<span className={styles.placeholderIconWrap}>
				<Flower2
					className={styles.placeholderIcon}
					strokeWidth={1.25}
					aria-hidden="true"
				/>
			</span>
			<h2 className={styles.placeholderTitle}>{title}</h2>
			<p className={styles.placeholderText}>{text}</p>
		</div>
	)
}

interface SubcategoriesProps {
	category: ICategory | null
	subcategories: Array<ICategory>
	isLoading: boolean
	isError: boolean
}

export function Subcategories({
	category,
	subcategories,
	isLoading,
	isError
}: SubcategoriesProps) {
	const queryClient: QueryClient = useQueryClient();

	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [subcategoryValue, setSubcategoryValue] = useState<string>('');

	const { mutateAsync } = useMutation({
		mutationFn: (data: ICreateSubcategory) => CategoryService.createCategory(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['categories']
			})

			setIsAdding(false)
			setSubcategoryValue('')
		}
	})

	const handleAddNewSubcategory = async () => {
		if (!category) return
		if (subcategoryValue.length === 0) return;

		try {
			const data: ICreateSubcategory = {
				parentId: category.id,
				name: subcategoryValue,
				order: subcategories.length + 1,
			}

			await mutateAsync(data);
		} catch (error) {
			console.error('Ошибка:', error);
		}
	}

	return (
		<section
			className={styles.detail}
			aria-live="polite"
			aria-label="Подкатегории раздела"
		>
			{isLoading ? (
				<div className={styles.detailSkeleton} aria-hidden="true">
					<span className={styles.detailSkeletonTitle} />
					<span className={styles.detailSkeletonText} />
					<span className={styles.detailSkeletonText} />
					<span className={styles.detailSkeletonText} />
				</div>
			) : isError ? (
				<EmptyState
					title="Не удалось загрузить разделы"
					text="Обновите страницу, чтобы попробовать снова."
				/>
			) : category ? (
				<>
					<div className={styles.detailHead}>
						<h2 className={styles.detailTitle}>{category.name}</h2>
						<p className={styles.detailCount}>
							{subcategories.length} подкатегорий
						</p>
					</div>

					<ul className={styles.subList}>
						{subcategories.map((item, index) => (
							<li key={item.id} className={styles.subItem}>
								<span className={styles.subIndex}>
									{formatIndex(index + 1)}
								</span>
								<span className={styles.subName}>{item.name}</span>
							</li>
						))}

						<li className={styles.subItemAdded}>
							{isAdding ? (
								<div className='w-full h-full flex items-center gap-2'>
									<span className={styles.addIndex} aria-hidden="true">
										{formatIndex(subcategories.length + 1)}
									</span>

									<Input
										value={subcategoryValue}
										onChange={e => setSubcategoryValue(e.target.value)}
										placeholder="Название подкатегории"
										aria-label="Название новой подкатегории"
										autoFocus
									/>

									<Button
										className="h-full"
										size="xs"
										onClick={handleAddNewSubcategory}
									>
										<span>Добавить</span>
									</Button>

									<Button
										className="h-full"
										size="xs"
										variant="destructive"
										onClick={() => setIsAdding(false)}
									>
										<X size={18} aria-hidden="true" />
									</Button>
								</div>
							) : (
								<Button
									size="lg"
									variant="secondary"
									className="w-full"
									onClick={() => setIsAdding(true)}
								>
									<Plus size={16} strokeWidth={2} aria-hidden="true" />
									<span>Добавить подкатегорию</span>
								</Button>
							)}
						</li>
					</ul>
				</>
			) : (
				<EmptyState
					title="Выберите раздел"
					text="Подкатегории появятся здесь, как только вы выберете раздел."
				/>
			)}
		</section>
	)
}
