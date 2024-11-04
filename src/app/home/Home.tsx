import { TypePaginationProducts } from '@/types/product.interface'

import { ProductCard } from '@/components/ui/cards/productCard/Card'

import styles from './Home.module.scss'

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
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			) : (
				<div>Ничего нет</div>
			)}
		</div>
	)
}

export default Home
