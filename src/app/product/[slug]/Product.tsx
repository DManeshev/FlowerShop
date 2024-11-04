import { memo } from 'react'
import Image from 'next/image'
import { LuFlower2 } from 'react-icons/lu'

import { IProduct } from '@/types/product.interface'

import Heading from '@/components/ui/heading/Heading'
import ProductImage from './components/ProductImage'
import ProductCardBtn from './components/ProductCardBtn'
import ProductCategory from './components/ProductCategory'

import styles from './Page.module.scss'

const Product = memo(function Product(props: IProduct) {
	const {
		name,
		description,
		price,
		images,
		categoryId,
		subcategoryId,
		flowers
	} = props

	return (
		<div className={styles.product}>
			{/* images */}
			<section className={styles.product__images}>
				<ProductImage images={images} name={name} />
				<div className="hidden">
					{images.map((image, index) => (
						<Image key={index} src={image} alt={name} fill />
					))}
				</div>
			</section>

			<section className={styles.product__content}>
				<div className="border-b pb-5">
					<Heading title={name} />
				</div>

				<div className={styles.product__attribute}>
					<ProductCategory
						categoryId={categoryId}
						subcategoryId={subcategoryId}
					/>

					<div className="flex items-start gap-2">
						<span className="text-[var(--dark-grey)]">Цветы:</span>
						<div className="flex flex-col gap-1">
							{flowers.map(item => (
								<div key={item.id} className="flex items-center gap-1">
									<LuFlower2 size={20} color="var(--purple)" />
									<span>{item.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className={styles.product__description}>{description}</div>

				<div className={styles.product__basket}>
					<div className={styles.product__price}>
						<span>{price}</span>
						<span>&#8381;</span>
					</div>
					<ProductCardBtn product={props} />
				</div>
			</section>
		</div>
	)
})

export default Product
