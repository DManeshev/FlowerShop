import Link from "next/link"

import Heading from "@/components/ui/heading/Heading"

export default function NotFound() {
    return (
        <main>
            <Heading title="Страница не найдена"/>

            <Link href='/'>Главная</Link>
        </main>
    )
}
