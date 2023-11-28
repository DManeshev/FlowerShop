import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'

import styles from './Input.module.scss'
import clsx from 'clsx'

interface IField extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	classes?: string
	error?: string
	children?: ReactNode
}

const Field = forwardRef<HTMLInputElement, IField>(
	({ type = 'text', label, error, classes = '', children, ...rest }, ref) => {
		return (
			<div className="flex flex-col w-full">
				{label ? <label className={styles.label}>{label}</label> : null}

				<input
					ref={ref}
					type={type}
					className={clsx(styles.input, styles[classes])}
					{...rest}
				/>

				{children}

				{error && <div className="text-red-600 text-[12px]">{error}</div>}
			</div>
		)
	}
)

export default Field
