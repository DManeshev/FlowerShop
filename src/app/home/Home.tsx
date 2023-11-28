import { ICategory } from '@/types/category.interface'

import Field from '@/components/ui/form/input/Input'
import Heading from '@/components/ui/heading/Heading'
import { CategoryCard } from '@/components/ui/cards/category/Category'

import styles from './Home.module.scss'
import Link from 'next/link'

interface IHome {
	categories: ICategory[]
}

const Home = ({ categories }: IHome) => {
	return (
		//
		<>
			<div className={styles.search__container}>
				<div className={styles.search}>
					<Field placeholder="Искать в Твоих цветах" classes="full" />
				</div>
			</div>

			<div className={styles.content}>
				{categories.map(({ id, name, slug, subCategories, icon, image }) => (
					<div key={id} className={styles.category__container}>
						<Heading title={name} className="font-bold" />

						{subCategories.length > 0 ? (
							<div className={styles.subcategory__container}>
								{subCategories.map(item => (
									<Link
										href={`category/${item.slug}`}
										key={item.slug}
										className={styles.subcategory}
									>
										<CategoryCard {...item} />
									</Link>
								))}
							</div>
						) : (
							<div className={styles.subcategory__container}>
								<Link href={`category/${slug}`} className={styles.subcategory}>
									<CategoryCard
										name={name}
										slug={slug}
										icon={icon}
										image={image}
									/>
								</Link>
							</div>
						)}
					</div>
				))}
			</div>

			<footer>footer</footer>
		</>
	)
}

export default Home
