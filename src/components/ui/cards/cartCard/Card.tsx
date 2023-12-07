import Link from 'next/link'
import { MouseEvent } from 'react'
import Image from 'next/image'
import { TbTrash } from 'react-icons/tb'

import { useActions } from '@/hooks/useAction'

import { ICart } from '@/types/cart.interface'

import styles from './Card.module.scss'

export default function Card({ product, quantity }: ICart) {
    const { addToCart } = useActions()

    const deleteProductFromCart = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()

        addToCart({ product, quantity })
    }

	return (
        <Link href={`/product/${product.slug}`} className='w-full'>
            <div className={styles.card}>
                <div className={styles.card__image}>
                    <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                </div>

                <div className={styles.card__info}>
                    <div className={styles.card__header}>
                        <p className={styles.card__title}>{product.name}</p>

                        <div className={styles.delete} onClick={deleteProductFromCart}>
                            <TbTrash />
                        </div>
                    </div>

                    <div className={styles.card__footer}>
                        <div className={styles.quantity}>{quantity}x</div>

                        <div className='ml-auto flex gap-1 font-Lora font-bold text-[var(--green)]'>
                            <div className={styles.price}>{quantity * product.price}</div>
                            <span>&#8381; </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
	)
}
