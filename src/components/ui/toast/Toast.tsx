import clsx from 'clsx'
import { useEffect } from 'react'

import { useActions } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'

import styles from './Toast.module.scss'

const Toast = () => {
	const { isShow, message, type } = useTypedSelector(state => state.toast)
	const { setToast } = useActions()

	const close = () => setToast({ isShow: false, message, type: 'truth' })

	useEffect(() => {
		if (isShow) {
			setTimeout(
				() => setToast({ isShow: false, message, type: 'truth' }),
				4000
			)
		}
	}, [isShow])

	return (
		<div
			className={clsx(styles.toast, {
				'!opacity-100 !visible !translate-y-0': isShow,
				'!bg-red-600': type === 'error'
			})}
		>
			<div className={styles.content}>
				<div className={styles.message}>{message}</div>

				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					onClick={close}
				>
					<path
						d="M22.5997 22.5999L1.39966 1.3999"
						stroke="#151515"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="bevel"
					/>
					<path
						d="M22.5997 1.3999L1.39966 22.5999"
						stroke="#151515"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="bevel"
					/>
				</svg>
			</div>
		</div>
	)
}

export default Toast
