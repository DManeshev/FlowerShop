import { forwardRef } from 'react'
import clsx from 'clsx'
import { FaXmark } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

import { IDrawer } from '@/types/drawer.interface'
import {
	overlayVariants,
	drawerDesctopVariants
} from '@/utils/animation.variants'

import styles from './Drawer.module.scss'

const DrawerDesctop = forwardRef<HTMLDivElement, IDrawer>(
	({ isOpen, isPage = false, closeDrawer, width = 'w-[600px]', children }, ref) => {
		const pathname = usePathname()

		if (pathname === '/' && isPage) return null

		return (
			<>
				{isOpen && (
					<AnimatePresence mode="wait" onExitComplete={closeDrawer}>
						<motion.div
							className="overlay"
							initial={'initial'}
							animate={'isOpen'}
							exit={'exit'}
							variants={overlayVariants}
							transition={{
								delayChildren: 0
							}}
						>
							<motion.div
								ref={ref}
								className={clsx(styles.BasketDesctop, width)}
								variants={drawerDesctopVariants}
								transition={{
									ease: 'linear',
									duration: 0.7
								}}
							>
								<div className={styles.BasketDesctop__close}>
									<button
										className={styles.BasketDesctop__closeBtn}
										onClick={closeDrawer}
									>
										<FaXmark />
									</button>
								</div>

								<div
									className={clsx(
										styles.BasketDesctop__body,
										'scrollbar--hide'
									)}
								>
									{children}
								</div>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				)}
			</>
		)
	}
)

export default DrawerDesctop
