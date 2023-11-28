import { ProductService } from '@/services/product/product.service'
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

import { IProduct } from '@/types/product.interface'
import { dateFormat } from '@/utils/dateFormat'
import { productCategoryFind, productStatusFind } from '@/utils/statusFind'

import styles from '../Dashboard.module.scss'
import { useState } from 'react'
import { useProductQuery } from '@/hooks/useQueries/useProductQuery'

interface IAllOrders {}

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
	columnHelper.accessor('category', {
		header: () => 'Категория',
		cell: info => productCategoryFind(info.getValue()),
		size: 100
	}),
	columnHelper.accessor('subCategory', {
		header: () => 'Подкатегория',
		cell: info => info.getValue()
	}),
	columnHelper.accessor('description', {
		header: () => 'Описание',
		cell: info => info.getValue(),
		size: 200
	})
]

export default function AllOrders({}: IAllOrders) {
	const { data, isLoading } = useProductQuery()

	const [sorting, setSorting] = useState<SortingState>([])

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
			{isLoading ? (
				<div>Loading</div>
			) : (
				<div className='overflow-auto'>
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
													color="var(--green)"
													cursor='pointer'
												/>
											</div>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map(row => (
								<tr key={row.id}>
									{row.getVisibleCells().map(cell => (
										<td key={cell.id} className={styles.body__cell}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
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
