import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import SubHeading from "@/components/ui/heading/SubHeading";

export default function EmptyBasket() {
	const router = useRouter();

	return (
		<div className="h-full flex flex-col place-content-center gap-3 px-5">
			<SubHeading
				title="Сейчас в корзине нет цветов"
				className="font-bold text-(--colorBlue) text-center"
			/>

			<DrawerClose
				render={
					<Button onClick={() => router.push('/')} size="xl">
						<span>На главную</span>
					</Button>}
			/>
		</div>
	)
}
