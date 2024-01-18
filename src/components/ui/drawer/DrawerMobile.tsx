import { forwardRef, type PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'

import {
	overlayVariants,
	drawerMobileVariants
} from '@/utils/animation.variants'
import { IDrawer } from '@/types/drawer.interface'

import styles from './Drawer.module.scss'
import clsx from 'clsx'

const DrawerMobile = forwardRef<HTMLDivElement, IDrawer>(
	({ isOpen, close, children }, ref) => {
		return (
			<AnimatePresence mode="wait" onExitComplete={close}>
				{isOpen && (
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
									onClick={close}
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
				)}
			</AnimatePresence>
		)
	}
)

export default DrawerMobile
