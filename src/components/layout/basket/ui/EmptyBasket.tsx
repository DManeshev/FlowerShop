import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import Heading from "@/components/ui/heading/Heading";
import { useRouter } from "next/navigation";

export default function EmptyBasket() {
	const router = useRouter();

	return (
		<div className="h-full flex flex-col place-content-center gap-3 px-5">
			<Heading
				title="Сейчас в корзине нет цветов"
				className="font-bold text-(--black) text-center"
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
