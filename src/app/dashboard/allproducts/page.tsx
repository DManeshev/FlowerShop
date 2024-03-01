'use client'

import { useState } from 'react'
import { useProductQuery } from '@/hooks/useQueries/useProductQuery'
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
	getSortedRowModel,
	SortingState
} from '@tanstack/react-table'
import { TbArrowsSort } from 'react-icons/tb'
import { FaPlus } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

import { IProduct } from '@/types/product.interface'
import { dateFormat } from '@/utils/dateFormat'
import { productStatusFind } from '@/utils/statusFind'

import Button from '@/components/ui/btn/button/Button'

import styles from '../Dashboard.module.scss'

const columnHelper = createColumnHelper<IProduct>()

const columns = [
	columnHelper.accessor('createdAt', {
		header: () => 'Дата создания',
		cell: info => dateFormat(info.getValue())
	}),
	columnHelper.accessor('status', {
		header: () => 'Статус',
		cell: info => productStatusFind(info.getValue()),
		size: 90
	}),
	columnHelper.accessor('name', {
		header: () => 'Название',
		cell: info => info.getValue(),
		size: 200
	}),
	columnHelper.accessor('price', {
		header: () => 'Цена',
		cell: info => info.getValue(),
		size: 50
	}),
	columnHelper.accessor('categoryId', {
		header: () => 'Категория',
		cell: info => info.getValue(),
		size: 50
	}),
	columnHelper.accessor('subcategoryId', {
		header: () => 'Подкатегория',
		cell: info => info.getValue(),
		size: 50
	}),
	columnHelper.accessor('description', {
		header: () => 'Описание',
		cell: info => info.getValue(),
		size: 200
	})
]

export default function DashboardAllProducts() {
	const { data, isLoading } = useProductQuery()

	const [sorting, setSorting] = useState<SortingState>([])
	const router = useRouter()

	const table = useReactTable({
		data: data ? data.products : [],
		columns,
		state: {
			sorting
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel()
	})

	return (
		<>
			<div className="flex justify-between items-center mb-5">
				<div className="text-2xl text-[var(--dark-purple)]">Товары</div>

				<Button title="Добавить заказ" icon={<FaPlus color="white" />} onClick={() => router.push('/dashboard/productaction')} />
			</div>

			{isLoading ? (
				<div>Loading</div>
			) : (
				<div className="overflow-auto">
					<table className="w-full">
						<thead>
							{table.getHeaderGroups().map(headerGroup => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<th
											key={header.id}
											className={styles.head__cell}
											style={{ width: header.getSize() }}
										>
											<div className="flex items-center justify-between gap-2">
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
												<TbArrowsSort
													onClick={header.column.getToggleSortingHandler()}
													color="var(--purple)"
													cursor="pointer"
												/>
											</div>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map(row => (
								<tr key={row.id} onClick={() => router.push(`/dashboard/productaction?productId=${row.original.id}`)}>
									{row.getVisibleCells().map(cell => (
										<td key={cell.id} className={styles.body__cell}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	)
}
