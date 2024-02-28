import {
	forwardRef,
	useRef,
	useState,
	InputHTMLAttributes,
	ChangeEvent
} from 'react'
import { motion } from 'framer-motion'
import { useOnClickOutside } from 'usehooks-ts'

import { IList } from '@/types/list.interface'

import Field from '../input/Input'
import Checkbox from '../checkbox/Checkbox'

import styles from './Select.module.scss'

interface ICheckedList {
	id: number | number
	name: string
}

interface ISelectMultiple extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	selectList: IList[]
	checkedList?: ICheckedList[]
	error?: string
	handleChange: ({ id, name }: IList) => void
}

const SelectMultiple = forwardRef<HTMLInputElement, ISelectMultiple>(
	({ label, selectList, checkedList, error, handleChange, ...rest }, ref) => {
		const [open, setOpen] = useState<boolean>(false)
		// Поиск по list
		const [searchTerm, setSearchTerm] = useState<string>('')
		const [filterList, setFilterList] = useState<IList[]>(selectList)
		// Выбранные значения
		const [checkedItems, setCheckedItems] = useState<IList[]>(
			checkedList
				? checkedList.map(item => ({
						id: String(item.id),
						name: item.name
				  }))
				: []
		)

		const containerRef = useRef<HTMLDivElement>(null)

		const handleSelect = (item: IList) => {
			let copyItems = checkedItems.concat()

			const findItem = copyItems.find(({ id }) => id === item.id)

			if (findItem) {
				copyItems = copyItems.filter(({ id }) => id !== item.id)
			} else {
				copyItems.push(item)
			}

			setCheckedItems(copyItems)
			handleChange(item)
		}

		const searchInList = (event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target

			if (value.length === 0) setFilterList(selectList)

			const filterListByValue = selectList.filter(({ name }) =>
				name.toLowerCase().includes(value.toLowerCase())
			)

			setSearchTerm(value)
			setFilterList(filterListByValue)
		}

		useOnClickOutside(containerRef, () => setOpen(false))

		return (
			<div className={styles.container} ref={containerRef}>
				<Field
					label={label}
					onClick={() => setOpen(true)}
					ref={ref}
					{...rest}
					readOnly
				/>
				{error && <div className="text-red-600 text-[12px]">{error}</div>}
				<motion.div
					className={`${styles.modal}`}
					animate={open ? 'open' : 'closed'}
					variants={{
						open: { height: 'auto', opacity: 1 },
						closed: { height: 0, opacity: 0 }
					}}
					transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
				>
					<Field
						value={searchTerm}
						onChange={searchInList}
						placeholder="Поиск по списку"
						classes="!rounded-b-none"
					/>
					{filterList.map(item => (
						<div
							key={item.id}
							className={styles.modal__item}
							onClick={() => handleSelect(item)}
						>
							<Checkbox
								checked={
									checkedItems.find(({ id }) => id === item.id) ? true : false
								}
								readOnly
							/>
							{item.name}
						</div>
					))}
				</motion.div>
			</div>
		)
	}
)

export default SelectMultiple
