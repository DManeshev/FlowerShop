import { useActions } from '@/hooks/useAction'

import styles from './Button.module.scss'
import { IProduct } from '@/types/product.interface'

interface IButtonCartDelete {
	product: IProduct
	quantity: number
}

export default function ButtonCartDelete({
	product,
	quantity
}: IButtonCartDelete) {
	const { addToCart } = useActions()

	return (
		<div
			className={styles.delete}
			onClick={() => addToCart({ product, quantity })}
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 34 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="Layer">
					<g id="Vrstva 91">
						<path
							id="Vector"
							d="M22 27.6665L12 17.6665"
							stroke="#151515"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="bevel"
						/>
						<path
							id="Vector_2"
							d="M22 17.6665L12 27.6665"
							stroke="#151515"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="bevel"
						/>
						<path
							id="Vector_3"
							d="M30.3333 2.0166H3.66667C2.74619 2.0166 2 2.76279 2 3.68327V7.0166C2 7.93708 2.74619 8.68327 3.66667 8.68327H30.3333C31.2538 8.68327 32 7.93708 32 7.0166V3.68327C32 2.76279 31.2538 2.0166 30.3333 2.0166Z"
							stroke="#151515"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="bevel"
						/>
						<path
							id="Vector_4"
							d="M28.6666 9.31641V32.6497C28.6666 33.5338 28.3154 34.3816 27.6903 35.0068C27.0652 35.6319 26.2173 35.9831 25.3333 35.9831H8.66659C7.78253 35.9831 6.93468 35.6319 6.30956 35.0068C5.68444 34.3816 5.33325 33.5338 5.33325 32.6497V9.31641"
							stroke="#151515"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="bevel"
						/>
					</g>
				</g>
			</svg>
		</div>
	)
}
