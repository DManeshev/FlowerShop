import { InputHTMLAttributes, forwardRef } from 'react'

import styles from './Radio.module.scss'

interface IFieldRadio extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

const FieldRadio = forwardRef<HTMLInputElement, IFieldRadio>(
	({ label, name, value, checked, id, onChange, ...rest }, ref) => {
		return (
			<div className={styles.container}>
				<input
                    className={styles.input}
					ref={ref}
					type="radio"
					name={name}
					value={value}
					checked={checked}
					id={id}
                    onChange={onChange}
					{...rest}
				/>
				{label ? (
					<label htmlFor={id} className={styles.label}>
						{label}
					</label>
				) : null}
			</div>
		)
	}
)

export default FieldRadio
