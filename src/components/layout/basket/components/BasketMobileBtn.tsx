import styles from '../Basket.module.scss'

interface IBasketMobileBtn {
    total: number
	openMobileCart: () => void
}

export default function BasketMobileBtn({ openMobileCart, total }: IBasketMobileBtn) {
	return (
		<div className={styles.basketMobileBtn}>
			<button className={styles.basketMobileBtn__btn} onClick={openMobileCart}>
				<span>{total} </span>
				<span>&#8381;</span>
			</button>
		</div>
	)
}
