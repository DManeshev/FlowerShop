import SubHeading from '@/components/ui/heading/SubHeading'
import styles from './Delivery.module.scss'

export default function DeliveryPage() {
	return (
		<div>
			<h1 className={styles.title}>🚚 Доставка</h1>

			<ul className={styles.container}>
				<li>
					<SubHeading title="💐 Готовые букеты в наличии" className='font-semibold text-[var(--purple)]' />
					<span className={styles.text}>Ежедневно обновляем витрину готовых букетов для быстрого заказа.</span>
				</li>
				<li>
					<SubHeading title="⏰ Выбор букета в течение 10 минут" className='font-semibold text-[var(--purple)]' />
					<span className={styles.text}>Наш администратор отправит Вам фотографии готовых букетов.</span>
				</li>
				<li>
					<SubHeading title="🤝 Курьер доставит лично в руки" className='font-semibold text-[var(--purple)]' />
          <span className={styles.text}>И учтет все ваши пожелания</span>
				</li>
				<li>
					<SubHeading title="🎉 Поздравление" className='font-semibold text-[var(--purple)]' />
					<span className={styles.text}>Подпишем открытку с ваших слов</span>
				</li>
				<li>
					<SubHeading title="🚚 Бесплатная доставка" className='font-semibold text-[var(--purple)]' />
          <ul className={styles.diskList}>
            <li>Доставка по Новому городу от 1000руб.</li>
            <li>Доставка по г. Чебоксары от 2000 руб.</li>
            <li>Доставка по г.Новочебоксарск от 2000руб.</li>
            <li>Доставка по г. Чебоксары в праздничные дни (от 3000 бесплатно).</li>
          </ul>
				</li>
			</ul>
		</div>
	)
}
