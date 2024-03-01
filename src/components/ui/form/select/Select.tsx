import { forwardRef, useRef, useState, InputHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'

import { IList } from '@/types/list.interface'

import Field from '../input/Input'

import styles from './Select.module.scss'

interface ISelect extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	selectList: IList[]
	error?: string
	handleChange: ({ id, name }: IList) => void
}

const Select = forwardRef<HTMLInputElement, ISelect>(
	({ label, selectList, error, handleChange, ...rest }, ref) => {
		const [open, setOpen] = useState<boolean>(false)

		const containerRef = useRef<HTMLDivElement>(null)

		const handleSelect = (name: string, id: string) => {
			setOpen(false)

			handleChange({ name, id })
		}

		useOnClickOutside(containerRef, () => setOpen(false))

		return (
			<div className={styles.container} ref={containerRef}>
				<Field
					label={label}
					ref={ref}
					onClick={() => setOpen(true)}
					{...rest}
					readOnly
				/>
				{error && <div className="text-red-600 text-[12px]">{error}</div>}
				<motion.div
					className={styles.modal}
					animate={open ? 'open' : 'closed'}
					variants={{
						open: { height: 'auto', opacity: 1 },
						closed: { height: 0, opacity: 0 }
					}}
					transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
				>
					{selectList.length > 0 ? (
						<>
							{selectList.map(({ name, id }) => (
								<div
									key={id}
									className={styles.modal__item}
									onClick={() => handleSelect(name, id)}
								>
									{name}
								</div>
							))}
						</>
					) : (
						<div>Список не найден</div>
					)}
				</motion.div>
			</div>
		)
	}
)

export default Select
