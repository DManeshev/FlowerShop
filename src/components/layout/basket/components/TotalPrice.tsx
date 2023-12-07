import { useRouter } from 'next/navigation'

import Button from '@/components/ui/btn/button/Button'

import styles from '../Basket.module.scss'
import Link from 'next/link'

interface ITotalPrice {
	total: number
	closeCart: () => void
}

export default function TotalPrice({ total, closeCart }: ITotalPrice) {
	const router = useRouter()

    const name = 'asdsad'
	return (
		<div className="w-full flex flex-col">
			<div className={styles.total}>
				<div className={styles.total__text}>Итого</div>
				<div className={styles.total__price}>
					<span>{total}</span>
					<span>&#8381; </span>
				</div>
			</div>

			<Button
				title="Перейти к оформлению"
				size="large"
				onClick={() => {
					router.push('/checkout')
                    closeCart()
				}}
			/>
		</div>
	)
}
