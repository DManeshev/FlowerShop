import { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { FaMapMarkerAlt } from 'react-icons/fa'

import Modal from '@/components/ui/modal/Modal'

import styles from './Basket.module.scss'
import { Map, Placemark } from '@pbe/react-yandex-maps'
import AuthHeaderBtn from '../header/AuthHeaderBtn'

export default function AsideMap() {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const modalRef = useRef<HTMLDivElement>(null)

	const openMap = () => setIsOpen(!isOpen)

	useOnClickOutside(modalRef, () => setIsOpen(false))

	return (
		<>
			<div className='flex items-center gap-5'>
				<div className={styles.info__map} onClick={openMap}>
					<FaMapMarkerAlt size={20} color="var(--green)" />
					<span>г. Чебоксары, Чебоксарский пр-кт, 27</span>
				</div>

				<AuthHeaderBtn />
			</div>

			<Modal isOpen={isOpen} close={() => setIsOpen(false)} ref={modalRef}>
				<div className={styles.container__map}>
					<Map
						defaultState={{ center: [56.125299, 47.384112], zoom: 17 }}
						width="100%"
						height="100%"
					>
						<Placemark geometry={[56.125299, 47.384112]} />
					</Map>
				</div>
			</Modal>
		</>
	)
}
