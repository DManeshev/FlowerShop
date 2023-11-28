import Image from 'next/image'
import Link from 'next/link'
import { TbTrash } from 'react-icons/tb'

import { useActions } from '@/hooks/useAction'

import { ICart } from '@/types/cart.interface'

import styles from './Card.module.scss'

export default function Card({ product, quantity }: ICart) {
    const { addToCart } = useActions()

    const deleteProductFromCart = () => addToCart({ product, quantity })

	return (
		<div className={styles.card}>
			<Link href={`/${product.category}/${product.slug}`} className={styles.card__image}>
				<Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
			</Link>

            <div className='h-full w-full flex flex-col'>
                <div className='flex items-start justify-between pb-4'>
                    <p className='w-[200px] overflow-hidden text-ellipsis font-bold text-base'>{product.name}</p>

                    <div className={styles.delete} onClick={deleteProductFromCart}>
                        <TbTrash />
                    </div>
                </div>

                <div className='flex gap-3'>
                    <div className={styles.quantity}>{quantity}x</div>
                    <div className={styles.text}>
                        <span>&#8381; </span>
                        {product.price}
                    </div>

                    <div className='ml-auto flex gap-1 font-Lora font-bold text-[var(--green)]'>
                        <span>&#8381; </span>
                        <div className={styles.price}>{quantity * product.price}</div>
                    </div>
                </div>
            </div>
		</div>
	)
}
