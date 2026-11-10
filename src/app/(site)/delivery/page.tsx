import type { Metadata } from 'next'

import SubHeading from '@/components/ui/heading/SubHeading'
import styles from './Delivery.module.scss'

export const metadata: Metadata = {
  title: 'Доставка цветов по Чебоксарам и Новочебоксарску',
  description: 'Доставка букетов по Чебоксарам от 2500 ₽, по Новому Городу от 1500 ₽, по Новочебоксарску от 2500 ₽. Бесплатная доставка в праздничные дни. Интернет-магазин «Твои цветы 21».',
  alternates: { canonical: '/delivery' },
  openGraph: {
    type: 'website',
    url: '/delivery',
    title: 'Доставка цветов по Чебоксарам и Новочебоксарску',
    description: 'Доставка букетов по Чебоксарам, Новому Городу и Новочебоксарску. Бесплатная доставка от 2500 ₽.',
    images: [{ url: '/og/og-home.jpg', width: 1200, height: 630, alt: 'Доставка цветов — Твои цветы 21' }]
  }
}

export default function DeliveryPage() {
  return (
    <div>
      <h1 className={styles.title}>
        <span>🚚</span>
        Доставка
      </h1>

      <ul className={styles.container}>
        <li>
          <SubHeading title="💐 Готовые букеты в наличии" className='font-semibold text-(--colorSalmon)' />
          <span className={styles.text}>Ежедневно обновляем витрину готовых букетов для быстрого заказа.</span>
        </li>
        <li>
          <SubHeading title="⏰ Выбор букета в течение 10 минут" className='font-semibold text-(--colorSalmon)' />
          <span className={styles.text}>Наш администратор отправит Вам фотографии готовых букетов.</span>
        </li>
        <li>
          <SubHeading title="🤝 Курьер доставит лично в руки" className='font-semibold text-(--colorSalmon)' />
          <span className={styles.text}>И учтет все ваши пожелания</span>
        </li>
        <li>
          <SubHeading title="🎉 Поздравление" className='font-semibold text-(--colorSalmon)' />
          <span className={styles.text}>Подпишем открытку с ваших слов</span>
        </li>
        <li>
          <SubHeading title="🚚 Бесплатная доставка" className='font-semibold text-(--colorSalmon)' />
          <ul className={styles.diskList}>
            <li>Доставка по Новому городу от 1500руб.</li>
            <li>Доставка по г. Чебоксары от 2500 руб.</li>
            <li>Доставка по г.Новочебоксарск от 2500руб.</li>
            <li>Доставка по г. Чебоксары в праздничные дни (от 3000 бесплатно).</li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
