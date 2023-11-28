import { forwardRef, InputHTMLAttributes } from 'react'
import { TbFilePlus } from 'react-icons/tb'

import styles from './FIle.module.scss'

interface IFile extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	classes?: string
	error?: string
}

const File = forwardRef<HTMLInputElement, IFile>(
	({ label, classes, error, ...rest }, ref) => {
		return (
			<>
				<label className={styles.label}>
					<TbFilePlus size={20} />
					<span>Загрузить фотографии</span>
					<input ref={ref} type="file" {...rest} className={styles.input} />
				</label>
				{error && <div className="text-red-600 text-[12px]">{error}</div>}
			</>
		)
	}
)

export default File
