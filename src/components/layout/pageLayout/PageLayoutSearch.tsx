'use client'

import { useState, ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'

import Field from '@/components/ui/form/input/Input'

import styles from './PageLayout.module.scss'

interface IPageLayoutSearch {}

export default function PageLayoutSearch({}: IPageLayoutSearch) {
	return (
		<div className={styles.search}>
			{/* <div className={styles.search__container}>
				<Field
					placeholder="Искать в Твоих цветах"
					classes="input__layout"
					icon={<FaSearch />}
				/>
			</div> */}
		</div>
	)
}
