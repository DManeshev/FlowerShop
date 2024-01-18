'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { register } from 'swiper/element/bundle'

import styles from './DetailProduct.module.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface IDetailImage {
	images: string[]
	name: string
}

register()

export default function DetailImage({ images, name }: IDetailImage) {
	const swiperRef = useRef(null)

	useEffect(() => {
		const swiperContainer = swiperRef.current

		const params = {
			pagination: {
				clickable: true
			},
			loop: true,
			speed: 400,
			slidesPerView: 1,
			spaceBetween: 20,
			injectStyles: [
				`
                    .swiper-pagination-bullet {
                        opacity: 1;
                        background-color: #FFF;
                    }
                    .swiper-pagination-bullet-active {
                        background-color: var(--green);
                    }
                `
			]
		}

		if (swiperContainer) {
			Object.assign(swiperContainer, params)
			swiperContainer.initialize()
		}
	}, [])

	return (
		<swiper-container ref={swiperRef} init={false}>
			{images.map(image => (
				<swiper-slide key={image}>
					<div className={styles.image}>
						<Image src={image} alt={name} fill />
					</div>
				</swiper-slide>
			))}
		</swiper-container>
	)
}
