import { FaBasketShopping } from "react-icons/fa6";

import Heading from "@/components/ui/heading/Heading";

export default function EmptyBasket() {
	return (
		<div className="h-full flex flex-col items-center justify-center">
			<FaBasketShopping size={125} color="var(--purple)" />
			<Heading
				title="В Корзине ничего нет"
				className="font-bold text-[var(--purple)]"
			/>
		</div>
	)
}
