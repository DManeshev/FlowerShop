'use client'

import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useProductQuery } from '@/hooks/useQueries/useProductQuery'

import { useDebounce } from '@uidotdev/usehooks';

import { IProduct } from '@/services'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Spinner } from "@/components/ui/spinner"
import { DashboardCard } from '@/components/ui/cards/dashboardCard'

import styles from './Dashboard.module.scss'

const DashboardPage: NextPage = () => {
	const router = useRouter()
	
	const [searchTerm, setSearchTerm] = useState<string>('');

	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	const { data, isFetching } = useProductQuery({
		searchTerm: debouncedSearchTerm,
		enabled: debouncedSearchTerm.length >= 3 
	})

	const sortedProducts = data &&
		data.products.sort((a: IProduct, b: IProduct) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(event.target.value)

	return (
		<div className={styles.content}>
			<div className={styles.header}>
				<Button
					onClick={() => router.push('/dashboard/productaction')}
					className={styles.createBtn}
				>
					<span>Добавить товар</span>
				</Button>

				<Field className={styles.search}>
					<Input
						id="search-product"
						placeholder="Поиск товара"
						value={searchTerm}
						onChange={handleSearch}
					/>
				</Field>
			</div>

			{isFetching && (
				<div className={styles.spinner}>
					<Spinner className="size-5" />
				</div>
			)}

			{data && (
				data.length === 0 ? (
					<div className={styles.spinner}>
						<span>Товаров не найдено</span>
					</div>
				) : (
					<div className={styles.products}>
						{sortedProducts && sortedProducts.map((item: IProduct) => (
							<DashboardCard
								key={item.id}
								product={item}
							/>
						))}
					</div>
				)
			)}
		</div>
	)
}

export default DashboardPage

