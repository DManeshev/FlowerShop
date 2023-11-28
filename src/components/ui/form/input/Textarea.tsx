import { TextareaHTMLAttributes } from 'react'

import styles from './Input.module.scss'

interface ICommonTextarea {
	label: string
	handleChange?: () => void
	classNames?: string
}

const CommonTextarea = ({
	label,
	classNames = '',
	cols,
	rows
}: ICommonTextarea & TextareaHTMLAttributes<ICommonTextarea>) => {
	return (
		<div className="w-full">
			<label className={styles.label}>{label}</label>
			<textarea
				className={`${styles.input} ${classNames}`}
				placeholder=" "
				rows={rows}
			></textarea>
		</div>
	)
}

export default CommonTextarea
