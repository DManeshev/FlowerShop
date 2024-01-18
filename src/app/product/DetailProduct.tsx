import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import Heading from '@/components/ui/heading/Heading'
import { EnumCategory, productCategory } from '@/types/enum/category.enum'
import { IProductDetails } from '@/types/product.interface'
import {
	productStatus,
	EnumProductStatus
} from '@/types/enum/productStatus.enum'

import SubHeading from '@/components/ui/heading/SubHeading'
import DetailImage from './DetailImage'
import DetailProductCart from './DetailProductCart'

import styles from './DetailProduct.module.scss'

import NoImage from '@/assets/images/NoImage.png'

const DetailProduct = ({ product }: IProductDetails) => {
	const { id, name, slug, description, price, createdAt, images, category, subCategory, status, isDelivery, flowers } = product

	return (
		<main className="container my-10">
			{/* breadcrumbs */}

			<div className={styles.container}>
				<section className={styles.images}>
					{images.length > 0 ? (
						<DetailImage images={images} name={name} />
					) : (
						<Image src={NoImage} alt="нет изображения" />
					)}
				</section>

				<section className={styles.main}>
					<Heading title={name} className="!pb-10" />

					<div className={styles.info}>
						<div>
							<div className={styles.info__container}>
								<div className={styles.info__label}>Категория:</div>
								<Link className={styles.info__link} href={`/${category}`}>
									{productCategory.find(({ id }) => id === category)?.name}
								</Link>
							</div>
							<div className={styles.info__container}>
								<div className={styles.info__label}>Статус:</div>
								<div
									className={clsx(
										styles.info__text,
										EnumProductStatus.inStock === status &&
											'text-[var(--green)]',
										EnumProductStatus.outStock === status &&
											'text-[var(--red)]',
										EnumProductStatus.customMade === status &&
											'text-[var(--green)]'
									)}
								>
									{productStatus.find(({ id }) => id === status)?.name}
								</div>
							</div>
						</div>

						<div>
							<div className={styles.info__container}>
								<div className={styles.info__label}>Доставка по:</div>
								<div className={styles.info__text}>
									{isDelivery
										? 'Новый Город, Чебоксары, Новочебоксарск'
										: 'Доставка не осуществляется'}
								</div>
							</div>
							{category === EnumCategory.BOUQUET ? (
								<div className={styles.info__container}>
									<div className={styles.info__label}>Цветы:</div>
									<div className="flex flex-wrap gap-3">
										{flowers.length > 0 &&
											flowers.map(flower => (
												<span key={flower.id} className={styles.info__span}>
													{flower.name}
												</span>
											))}
									</div>
								</div>
							) : null}
						</div>
					</div>

					<div className={styles.payment}>
						<span className={styles.price}>{price} РУБ</span>

						<DetailProductCart product={product} />
					</div>

					<div>
						<SubHeading title="Описание" className="font-semibold" />
						{description ? (
							<p className={styles.description}>{description}</p>
						) : null}
					</div>
				</section>
			</div>
		</main>
	)
}

export default DetailProduct
