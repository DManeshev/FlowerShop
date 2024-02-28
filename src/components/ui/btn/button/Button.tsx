import { ButtonHTMLAttributes, ReactNode } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { IconType } from 'react-icons'

import styles from './Button.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string
	icon?: ReactNode | IconType
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
	const classNameObject = clsx(
		styles.btn,
		styles[theme],
		styles[size],
		classes && classes
	)

	return (
		<button className={classNameObject} {...rest}>
			<span>{title}</span>
			{icon && <>{icon}</>}
		</button>
	)
}

export default Button
