import clsx from 'clsx'
import Link from 'next/link'
import { PropsWithChildren, ReactNode } from 'react'
import { TbShoppingBag, TbShoppingBagCheck } from 'react-icons/tb'

import styles from './Dashboard.module.scss'

interface IDashboardLayout extends PropsWithChildren<unknown> {
	children: ReactNode
}

const tabs = [
	{
		id: 'orders',
		name: 'Заказы',
		icon: <TbShoppingBagCheck size={20} />
	},
	{
		id: 'allproducts',
		name: 'Товары',
		icon: <TbShoppingBag size={20} />
	}
]

export default function DashboardLayout({ children }: IDashboardLayout) {
	return (
		<div className={styles.dashboard}>
			<nav className={styles.nav}>
				{tabs.map(({ id, name, icon }) => (
					// className={clsx(
					// 	styles.aside__item,
					// 	selectedTab === id && styles.active
					// )}
					<Link key={id} href={`/dashboard/${id}`} className={clsx(styles.nav__link)}>
						<span>{icon}</span>
						<span>{name}</span>
					</Link>
				))}
			</nav>

            <div className={styles.content}>
                {children}
            </div>
		</div>
	)
}
