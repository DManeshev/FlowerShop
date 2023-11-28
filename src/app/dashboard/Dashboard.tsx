'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import {
	TbShoppingBagPlus,
	TbShoppingBagEdit,
	TbShoppingBagCheck,
	TbShoppingBag
} from 'react-icons/tb'

import AllOrders from './tabs/AllOrders'
import ProductActions from './tabs/ProductActions'
import OrdersUsers from './tabs/OrdersUsers'

import styles from './Dashboard.module.scss'

const tabs = [
	{
		id: 'allOrders',
		name: 'Все заказы',
		icon: <TbShoppingBag size={20} />
	},
	{
		id: 'create',
		name: 'Создать заказ',
		icon: <TbShoppingBagPlus size={20} />
	},
	{
		id: 'edit',
		name: 'Редактировать заказ',
		icon: <TbShoppingBagEdit size={20} />
	},
	{
		id: 'orders',
		name: 'Заказы клиентов',
		icon: <TbShoppingBagCheck size={20} />
	}
]

const Dashboard = () => {
	const [selectedTab, setSelectedTab] = useState<string>('allOrders')

	const dashboardTabs: any = {
		allOrders: () => <AllOrders />,
		create: () => <ProductActions action="create" />,
		edit: () => <ProductActions action="edit" />,
		orders: () => <OrdersUsers />
	}

	return (
		<div className="container flex flex-col my-5">
			<div className={styles.dashboard}>
				{/* Навигация */}
				<aside className={styles.aside}>
					{tabs.map(({ id, name, icon }) => (
						<div
							key={id}
							className={clsx(
								styles.aside__item,
								selectedTab === id && styles.active
							)}
							onClick={() => setSelectedTab(id)}
						>
							{icon}
							{name}
						</div>
					))}
				</aside>

				{/* Контент */}
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedTab ? dashboardTabs[selectedTab] : 'empty'}
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className={styles.content}
					>
						{dashboardTabs[selectedTab]()}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	)
}

export default Dashboard
