'use client'

import { usePathname, useRouter } from 'next/navigation'
import { FaArrowLeft } from 'react-icons/fa6'

import styles from './PageLayout.module.scss'
import { useQuery } from '@tanstack/react-query'
import { CategoryService } from '@/services/category/category.service'

export default function PageLayoutNavigation() {
	const router = useRouter()
	const pathname = usePathname()

	const directories = pathname.split('/')
	const lastDirectories = directories[directories.length - 1]

	const isShowNavigation = pathname === '/' || pathname === '/checkout'

	const { data } = useQuery(
		[`get subcategory ${lastDirectories}`],
		() => CategoryService.getSubcategoryBySlug(lastDirectories),
		{ select: ({ data }) => data, enabled: !isShowNavigation }
	)

	return (
		<>
			{isShowNavigation ? (
				<></>
			) : (
				<div className={styles.navigation}>
					<div className={styles.navigation__btn} onClick={() => router.back()}>
						<FaArrowLeft />
					</div>

					<h1 className={styles.navigation__name}>{data?.name}</h1>
				</div>
			)}
		</>
	)
}
