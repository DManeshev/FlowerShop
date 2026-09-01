import Link from 'next/link'
import Image from 'next/image'
import { MouseEvent, SetStateAction, Dispatch } from 'react'
import clsx from 'clsx'

import { ICart } from '@/types/cart.interface'
import { IFlower } from '@/types/flower.interface'
import { useActions } from '@/hooks/useAction'
import { formatPrice } from '@/lib/utils'

import { Badge } from '../../badge'
import { IoTrashOutline } from "react-icons/io5";

import styles from './Card.module.scss'

interface CardProps {
	productCart: ICart;
	setOpen: Dispatch<SetStateAction<boolean>>
}

export default function Card({ productCart, setOpen }: CardProps) {
	const { product, quantity } = productCart;

	const { deleteProductFromCart } = useActions()

	const deleteProduct = () => deleteProductFromCart({ id: product.id });

	return (
		<div className={styles.card}>
			<Link href={`/product/${product.slug}`} onClick={() => setOpen(false)}>
				<div className={styles.image}>
					<Image
						src={product.images[0]}
						alt={product.name}
						fill
					/>
				</div>
			</Link>

			<div className={styles.content}>
				<div className={styles.header}>
					<div className={clsx(styles.badges, 'scrollbar--hide')}>
						{!!product.flowers.length ? (
							<>
								{product.flowers.map((item: IFlower) => (
									<Badge key={item.id} className={styles.badge}>
										<span>{item.name}</span>
									</Badge>
								))}
							</>
						) : null}
					</div>

					<button onClick={deleteProduct} className={styles.delete}>
						<span><IoTrashOutline /></span>
					</button>
				</div>

				<div className={styles.info}>
					<Link
						href={`/product/${product.slug}`}
						onClick={() => setOpen(false)}
						className={styles.title}
					>
						<h2>{product.name}</h2>
					</Link>

					<div className={styles.price}>{formatPrice(product.price)}</div>
				</div>
			</div>
		</div>
	)
}
