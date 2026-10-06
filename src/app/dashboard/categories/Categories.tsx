'use client'

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { CategoryService, ICategory } from "@/services"

import styles from './styles.module.scss'
import clsx from "clsx"

export default function CategoriesPage() {
    const [activeCategory, setActiveCategory] = useState<number | null>(null)
    const [listSubcategories, setListSubcategories] = useState<Array<ICategory>>([]);

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => CategoryService.getAll(),
    })
	
    return (
        <div className={styles.container}>
            {categories ? 
                <div className={styles.categories}>
                    <ul className={styles.list}>
                        {categories.map((item: ICategory) => (
                            <li
                                key={item.id}
                                onClick={() => {
                                    setActiveCategory(item.id)
                                    setListSubcategories(item.subCategories)
                                }}
                                className={clsx(styles.item, activeCategory === item.id && styles.active)}
                            >
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                : null
            }

            {listSubcategories.length ? (
                <div className={styles.categories}>
                    <ul className={styles.list}>
                        {listSubcategories.map(item => (
                            <li
                                key={item.id}
                                className={styles.item}
                            >
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}