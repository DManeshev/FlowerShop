import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	forwardRef
} from 'react'
import clsx from 'clsx'

import styles from './Modal.module.scss'
import SubHeading from '../heading/SubHeading'

interface IModalSide extends PropsWithChildren {
	title: string
	show: boolean
	setShow: Dispatch<SetStateAction<boolean>>
}

const ModalSide = forwardRef<HTMLDivElement, IModalSide>(
	({ title, show, setShow, children }, ref) => {

		return (
			<div
				className={clsx(
					styles.modal__overlay,
					show && styles.modal__overlay__visible
				)}
			>
				<div className={clsx(styles.modal, show && styles.modal__show)} ref={ref}>
					<div className={styles.modal__header}>
						<SubHeading title={title} />

						<svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
							onClick={() => {
								setShow(false)
								document.body.classList.remove('overflow-y-hidden')
							}} 
							className='cursor-pointer'
						>
                            <path d="M22.5997 22.5999L1.39966 1.3999" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                            <path d="M22.5997 1.3999L1.39966 22.5999" stroke="#151515" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                        </svg>
					</div>

					{children}
				</div>
			</div>
		)
	}
)

export default ModalSide
