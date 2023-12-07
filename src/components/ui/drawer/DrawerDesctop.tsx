import { AnimatePresence, motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'

import { IDrawer } from '@/types/drawer.interface'
import { overlayVariants, drawerDesctopVariants } from '@/utils/animation.variants'

import styles from './Drawer.module.scss'

export default function DrawerDesctop({ isOpen, close, children }: IDrawer) {
	return (
		<AnimatePresence mode='wait' onExitComplete={close}>
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
						className={styles.BasketDesctop}
						variants={drawerDesctopVariants}
						transition={{
                            ease: 'linear',
                            duration: 0.8
                        }}
					>
                        <div className={styles.BasketDesctop__close}>
							<button
								className={styles.BasketDesctop__closeBtn}
								onClick={close}
							>
								<FaXmark />
							</button>
						</div>
						<div className={styles.BasketDesctop__body}>{children}</div>
                    </motion.div>
                </motion.div>
			)}
		</AnimatePresence>
	)
}
