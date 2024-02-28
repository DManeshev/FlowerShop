'use client'

import { usePathname, useRouter } from 'next/navigation'
import { FaArrowLeft, FaSistrix } from 'react-icons/fa6'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { useOnClickOutside } from 'usehooks-ts'
import Image from 'next/image'

import { useMutation, useQuery } from '@tanstack/react-query'
import { CategoryService } from '@/services/category/category.service'
import { ICategory } from '@/types/category.interface'

import DrawerMobile from '@/components/ui/drawer/DrawerMobile'

import styles from './PageLayout.module.scss'
import Link from 'next/link'

export default function PageLayoutNavigation() {
	const [openDrawer, setIsOpenDrawer] = useState<boolean>(false)
	const [categories, setCategories] = useState<ICategory[]>([])

	const router = useRouter()
	const pathname = usePathname()
	const refDrawer = useRef<HTMLDivElement>(null)

	const directories = pathname.split('/')
	const lastDirectories = directories[directories.length - 1]

	const isShowNavigation = pathname === '/'

	const { data } = useQuery(
		[`get subcategory ${lastDirectories}`],
		() => CategoryService.getSubcategoryBySlug(lastDirectories),
		{ select: ({ data }) => data, enabled: !isShowNavigation }
	)

	const { mutate, isLoading } = useMutation(
		['categories'],
		() => CategoryService.getAll(),
		{
			onSuccess({ data }) {
				setCategories(data)
			}
		}
	)

	useOnClickOutside(refDrawer, () => setIsOpenDrawer(false))

	const handleGetCategories = async () => {
		setIsOpenDrawer(true)
		mutate()
	}

	const handleSubcategory = (slug: string) => {
		setIsOpenDrawer(false)
		router.push(`/category/${slug}`)
	}

	return (
		<div
			className={clsx(
				isShowNavigation && styles.navigation__main,
				styles.navigation
			)}
		>
			{isShowNavigation ? (
				<></>
			) : (
				<>
					<div className={styles.navigation__btn} onClick={() => router.back()}>
						<FaArrowLeft />
					</div>

					<h1 className={styles.navigation__name}>{data?.name}</h1>

					<div
						className={styles.navigation__search}
						onClick={handleGetCategories}
					>
						<FaSistrix />
					</div>
				</>
			)}

			<DrawerMobile
				ref={refDrawer}
				isOpen={openDrawer}
				closeDrawer={() => setIsOpenDrawer(false)}
			>
				{isLoading ? (
					<div>Загрузка</div>
				) : (
					<>
						{categories.map(item => (
							<div>
								<div className={styles.logo}>{item.name}</div>
								<div>
									{item.subCategories.map(sub => (
										<div
											onClick={() => handleSubcategory(sub.slug)}
											className={styles.subcategory}
										>
											<div className={styles.subcategory__image}>
												<Image
													src={sub.icon}
													alt={`Иконка для подкатегории: ${sub.name}`}
													width={25}
													height={25}
												/>
											</div>
											<div className={styles.subcategory__logo}>{sub.name}</div>
										</div>
									))}
								</div>
							</div>
						))}
					</>
				)}
			</DrawerMobile>
		</div>
	)
}
