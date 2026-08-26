'use client'

import { memo } from 'react'
import Image from 'next/image'
import { LuFlower2 } from 'react-icons/lu'

import { IProduct } from '@/types/product.interface'
import { useActions } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading/Heading'

import styles from './Page.module.scss'
import { ICart } from '@/types/cart.interface'

const Product = memo(function Product(props: IProduct) {
	const {
		id,
		name,
		description,
		price,
		images,
		flowers
	} = props;

	const { addToCart } = useActions();
	const { cart } = useTypedSelector(state => state.cart);

	const btnText: string = cart.find((item: ICart) => item.product.id === id)
		? 'Букет в корзине'
		: `Добавить в корзину ${price}`;

	const handleAddToCart = () => addToCart({ product: props, quantity: 1 });

	const imagesAfterBig: Array<string> = images.slice(1);

	return (
		<div className={styles.product}>
			<section className={styles.product__images}>
				{/* BIG IMAGE */}
				<div className={styles.bigImage}>
					<Image src={images[0]} alt={name} fill />
				</div>

				{/* SMALL IMAGE */}
				{!!imagesAfterBig.length ?
					<div className={styles.smallImages}>
						{images.slice(1).map((image, index) => (
							<div key={index} className={styles.smallImages__img}>
								<Image src={image} alt={name} fill />
							</div>
						))}
					</div>
					: null
				}
			</section>

			<section className={styles.product__content}>
				<div className={styles.product__content_info}>
					<Heading title={name} className={styles.product__content_title} />

					<div className={styles.product__attribute}>
						<span className={styles.product__attribute_title}>Цветы:</span>
						<div className="flex flex-col gap-1">
							{flowers.map(item => (
								<div key={item.id} className="flex items-center gap-1">
									<LuFlower2 size={20} color="var(--green)" />
									<span>{item.name}</span>
								</div>
							))}
						</div>
					</div>

					<div className={styles.product__price}>
						<span>{price}</span>
						<span>&#8381;</span>
					</div>
				</div>

				<div className={styles.product__description}>{description}</div>

				<div className={styles.product__btn_container}>
					<Button
						variant="outline"
						size="xl"
						onClick={handleAddToCart}
						className={styles.product__btn}
					>
						<span>{btnText}</span>
					</Button>
				</div>
			</section>
		</div>
	)
})

export default Product
