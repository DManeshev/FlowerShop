'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCallback, useRef } from 'react'
import clsx from 'clsx'

import 'swiper/css'
import styles from '../Page.module.scss'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

interface IProductImage {
	images: string[]
	name: string
}

export default function ProductImage({ images, name }: IProductImage) {
	const sliderRef = useRef(null)

	const handlePrev = useCallback(() => {
		if (!sliderRef.current) return
		/* @ts-ignore */
		sliderRef.current.swiper.slidePrev()
	}, [])

	const handleNext = useCallback(() => {
		if (!sliderRef.current) return
		/* @ts-ignore */
		sliderRef.current.swiper.slideNext()
	}, [])

	return (
		<div className='relative'>
			<Swiper ref={sliderRef} loop={true} className="w-full rounded-5">
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

			<div
				className={clsx(styles.arrow, styles.arrow__left)}
				onClick={handlePrev}
			>
				<FaArrowLeftLong />
			</div>
			<div
				className={clsx(styles.arrow, styles.arrow__rigth)}
				onClick={handleNext}
			>
				<FaArrowRightLong />
			</div>
		</div>
	)
}
