import { forwardRef, type PropsWithChildren } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'

import { overlayVariants } from '@/utils/animation.variants'

import styles from './Modal.module.scss'

interface IModal extends PropsWithChildren {
	isOpen: boolean
	close: () => void
}

const modalVariants: Variants = {
	initial: { top: '-50%', transition: { type: 'spring' } },
	isOpen: { top: '50%' },
	exit: { top: '-50%' }
}

const Modal = forwardRef<HTMLDivElement, IModal>(
	({ isOpen, close, children }, ref) => {
		return (
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className='overlay'
						initial={'initial'}
						animate={'isOpen'}
						exit={'exit'}
						variants={overlayVariants}
					>
						<motion.div
							ref={ref}
							variants={modalVariants}
							className={styles.modal}
						>
							<div className={styles.modal__close}>
								<FaXmark onClick={close} size={30} />
							</div>
							{children}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		)
	}
)

export default Modal
