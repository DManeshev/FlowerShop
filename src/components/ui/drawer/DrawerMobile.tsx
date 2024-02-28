import { forwardRef } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'
import clsx from 'clsx'

import {
	overlayVariants,
	drawerMobileVariants
} from '@/utils/animation.variants'
import { IDrawer } from '@/types/drawer.interface'

import styles from './Drawer.module.scss'

const DrawerMobile = forwardRef<HTMLDivElement, IDrawer>(
	({ isOpen, isPage = false, closeDrawer, children }, ref) => {
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
								className={styles.BasketMobile}
								variants={drawerMobileVariants}
								transition={{
									ease: 'linear',
									duration: 0.6
								}}
							>
								<div className={styles.BasketMobile__close}>
									<button
										className={styles.BasketMobile__closeBtn}
										onClick={closeDrawer}
									>
										<FaXmark />
									</button>
								</div>
								<div
									className={clsx(styles.BasketMobile__body, 'scrollbar--hide')}
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

export default DrawerMobile
