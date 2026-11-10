import type { Metadata } from 'next'

import SubHeading from '@/components/ui/heading/SubHeading'
import styles from './Subscription.module.scss'

export const metadata: Metadata = {
	title: 'Цветочная подписка',
	description: 'Цветочная подписка — регулярная доставка свежих букетов по Чебоксарам, Новому Городу и Новочебоксарску. Сезонные цветы каждую неделю. Интернет-магазин «Твои цветы 21».',
	alternates: { canonical: '/subscription' },
	openGraph: {
		type: 'website',
		url: '/subscription',
		title: 'Цветочная подписка — Твои цветы 21',
		description: 'Регулярная доставка свежих букетов по Чебоксарам и Новочебоксарску.',
		images: [{ url: '/og/og-home.jpg', width: 1200, height: 630, alt: 'Цветочная подписка — Твои цветы 21' }]
	}
}

export default function SubscriptionPage() {
	return (
		<div className={styles.subscription}>
			<h1 className={styles.title}>
				<span>📬 </span>
				Подписка
			</h1>

			<p>
				Цветочная подписка — это абонемент на букеты с регулярной доставкой. <br />
				Мы будем привозить сезонные цветы каждую неделю тому, кто вам особенно
				дорог. Кстати, этим человеком легко можете быть вы сами :)
			</p>

			<SubHeading title="Зачем нужна подписка?" className='font-semibold text-(--colorSalmon)' />
			<ul className={styles.container}>
				<li>🌱 Радовать любимых, даже если вы далеко.</li>
				<li>🌱 Баловать себя и наслаждаться свежими цветами каждый день.</li>
				<li>🌱 Добавить очарования и стиля офису, шоуруму, салону красоты или кафе</li>
			</ul>
		</div>
	)
}