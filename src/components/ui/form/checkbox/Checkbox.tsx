import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import styles from './Checkbox.module.scss'
import clsx from 'clsx'

type TypeCheckbox = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label?: string
	classes?: string
}

const Checkbox = (props: TypeCheckbox) => {
	const { label, classes = '' } = props

	return (
		<label
			htmlFor={props.id}
			className={clsx(styles.label, props.disabled && styles.label__disabled)}
		>
			<input
				type="checkbox"
				className={`${styles.checkbox} ${styles[classes]}`}
				{...props}
			/>
			{label ? label : null}
		</label>
	)
}

export default Checkbox
