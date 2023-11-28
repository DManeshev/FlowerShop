'use client'

import clsx from 'clsx'

import { IProduct } from '@/types/product.interface'

import Button from '@/components/ui/btn/button/Button'
import SubHeading from '@/components/ui/heading/SubHeading'
import Range from '@/components/ui/form/range/Range'
import SideFilters from '@/components/ui/sideFilters/SideFilters'
import CardProduct from '@/components/ui/cards/productCard/Card'
import NotFoundProducts from '@/components/errors/NotFoundProducts'

interface ICatalogWrapper {
	products: IProduct[]
}

const CatalogWrapper = ({ products }: ICatalogWrapper) => {
	return (
		<main className="container flex">
			<div className="catalog">
				<SideFilters>
					<div>
						<SubHeading title="Цена" className="font-bold" />
						<Range />
					</div>

					<Button title="Применить" />
				</SideFilters>

				<div
					className={clsx('catalog__cards', products.length === 0 && 'h-full')}
				>
					{products.length > 0 ? (
						<>
							{products.map(product => (
								<CardProduct key={product.id} {...product} />
							))}
						</>
					) : (
						<NotFoundProducts />
					)}
				</div>
			</div>
		</main>
	)
}

export default CatalogWrapper
