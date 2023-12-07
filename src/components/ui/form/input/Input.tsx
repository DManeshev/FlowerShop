import { InputHTMLAttributes, ReactElement, ReactNode, forwardRef } from 'react'
import { IconType } from 'react-icons'

import styles from './Input.module.scss'
import clsx from 'clsx'

interface IField extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	classes?: string
	error?: string
	children?: ReactNode
	icon?: ReactElement<IconType>
}

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ type = 'text', label, error, classes = '', children, icon, ...rest },
		ref
	) => {
		return (
			<div className={styles.container}>
				{label ? <label className={styles.label}>{label}</label> : null}

				<input
					ref={ref}
					type={type}
					className={clsx(styles.input, styles[classes])}
					{...rest}
				/>

				{icon && <div className={styles.icon}>{icon}</div>}

				{children}

				{error && <div className="text-red-600 text-[12px]">{error}</div>}
			</div>
		)
	}
)

export default Field
