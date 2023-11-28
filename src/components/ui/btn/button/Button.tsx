import { ButtonHTMLAttributes } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import styles from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	icon?: any
	size?: 'large' | 'base' | 'small'
	theme?: 'default' | 'red'
	classes?: string
}

const Button = ({
	title,
	icon,
	theme = 'default',
	size = 'base',
	classes,
	...rest
}: IButton) => {
	const classNameObject = clsx(styles.btn, styles[theme], styles[size], classes && classes)

	return (
		<button className={classNameObject} {...rest}>
			{icon && <Image src={icon} alt="иконка кнопки" width={16} height={16} />}
			<span>{title}</span>
		</button>
	)
}

export default Button
