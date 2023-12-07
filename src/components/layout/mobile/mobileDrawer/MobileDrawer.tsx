import type { PropsWithChildren } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'

import { overlayVariants, mobileMenuVariants } from '@/utils/animation.variants'

import styles from './MobileDrawer.module.scss'

interface IMobileDrawer extends PropsWithChildren<unknown> {
	isOpen: boolean
	closeCart: () => void
}

export default function MobileDrawer({
	isOpen,
	closeCart,
	children
}: IMobileDrawer) {
	return (
		<AnimatePresence mode="wait" onExitComplete={closeCart}>
			{isOpen && (
				<motion.div
					className="overlay"
					initial={'initial'}
					animate={'isOpen'}
					exit={'exit'}
					variants={overlayVariants}
				>
					<motion.div
						className={styles.BasketMobile}
						variants={mobileMenuVariants}
						transition={{
							type: 'spring',
							damping: 30,
							stiffness: 400
						}}
					>
						<div className={styles.BasketMobile__close}>
							<button
								className={styles.BasketMobile__closeBtn}
								onClick={closeCart}
							>
								<FaXmark />
							</button>
						</div>
                        <div className={styles.BasketMobile__body}>
						    {children}
                        </div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
