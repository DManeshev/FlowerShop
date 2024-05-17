import Link from 'next/link'

import { IProduct, TypePaginationProducts } from '@/types/product.interface'

import Heading from '@/components/ui/heading/Heading'
import { CategoryCard } from '@/components/ui/cards/category/Category'

import styles from './Home.module.scss'
import { ProductCard } from '@/components/ui/cards/productCard/Card'

interface IHome {
	paginationProducts: TypePaginationProducts
}

const Home = ({ paginationProducts }: IHome) => {
	const { products, length } = paginationProducts
	return (
		<div>
			{products.length > 0 ? (
				<div className={styles.products}>
					{products.map(product => (
						<ProductCard {...product} />
					))}
				</div>
			) : (
				<div>Ничего нет</div>
			)}
		</div>
	)
}

export default Home
