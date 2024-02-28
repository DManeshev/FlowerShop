'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import styles from '../Page.module.scss'

interface IProductImage {
	images: string[]
	name: string
}

export default function ProductImage({ images, name }: IProductImage) {
	return (
		<Swiper loop={true} className='w-full rounded-5'>
			{images.map((image, index) => (
				<SwiperSlide key={index}>
					<div className={styles.image}>
						<Image
							src={image}
							alt={name}
							className="block object-cover object-bottom"
							fill
							priority
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
