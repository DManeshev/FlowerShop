import type { PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'

import { overlayVariants, drawerMobileVariants } from '@/utils/animation.variants'
import { IDrawer } from '@/types/drawer.interface'

import styles from './Drawer.module.scss'

export default function DrawerMobile({ isOpen, close, children }: IDrawer) {
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
						<div className={styles.BasketMobile__body}>{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
