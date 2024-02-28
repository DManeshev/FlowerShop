import Link from "next/link"

import Heading from "@/components/ui/heading/Heading"

export default function NotFound() {
    return (
        <div className='not__found'>
            <Heading title="Страница не найдена" className="text-[var(--purple)] font-bold" />

            <Link href='/'>Главная</Link>
        </div>
    )
}