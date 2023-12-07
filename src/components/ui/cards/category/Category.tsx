import { memo } from 'react'
import Image from 'next/image'

import { ICategory } from '@/types/category.interface'

import styles from './Category.module.scss'

type TypeCategoryCard = Pick<ICategory, 'name' | 'slug' | 'icon' | 'image'>

export const CategoryCard = memo(({ name, slug, icon, image }: TypeCategoryCard) => {
	return (
		<div className={styles.card}>
			<div className={styles.card__image}>
                <Image src={icon} alt={name} fill />
			</div>
            <span className={styles.card__title}>{name}</span>
		</div>
	)
})
