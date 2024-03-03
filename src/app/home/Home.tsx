import Link from 'next/link'

import { ICategory } from '@/types/category.interface'

import Heading from '@/components/ui/heading/Heading'
import { CategoryCard } from '@/components/ui/cards/category/Category'

import styles from './Home.module.scss'

interface IHome {
	categories: ICategory[]
}

const Home = ({ categories }: IHome) => {
	return (
		<div>
			{categories.map(({ id, name, slug, subCategories, icon, image }) => (
				<div key={id} className={styles.category__container}>
					<Heading title={name} className="font-bold text-[var(--dark-purple)]" />

					{subCategories.length > 0 ? (
						<div className={styles.subcategory__container}>
							{subCategories
								.sort((a, b) => a.id - b.id)
								.map(item => (
									<Link
										href={`/category/${item.slug}`}
										key={item.id}
										className={styles.subcategory}
									>
										<CategoryCard {...item} />
									</Link>
								))}
						</div>
					) : (
						<div className={styles.subcategory__container}>
							<Link href={`/category/${slug}`} className={styles.subcategory}>
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
	)
}

export default Home
