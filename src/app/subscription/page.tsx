import SubHeading from '@/components/ui/heading/SubHeading'
import styles from './Subscription.module.scss'

export default function SubscriptionPage() {
	return (
		<div className={styles.subscription}>
			<h1 className={styles.title}>📬 Подписка</h1>

			<p>
				Цветочная подписка — это абонемент на букеты с регулярной доставкой. <br />
        Мы будем привозить сезонные цветы каждую неделю тому, кто вам особенно
				дорог. Кстати, этим человеком легко можете быть вы сами :)
			</p>

      <SubHeading title="Зачем нужна подписка?" className='font-semibold text-[var(--purple)]' />
      <ul className={styles.container}>
        <li>🌱 Радовать любимых, даже если вы далеко.</li>
        <li>🌱 Баловать себя и наслаждаться свежими цветами каждый день.</li>
        <li>🌱 Добавить очарования и стиля офису, шоуруму, салону красоты или кафе</li>
      </ul>
		</div>
	)
}