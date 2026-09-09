'use client'

import { buttonVariants } from "@/components/ui/button"

import styles from './error.module.scss'

export default function NotFoundProducts() {
    return (
        <div className={styles.error}>
            <div className={styles.error__logo}>
                В настоящее время в данной категории товаров нет
            </div>

            <a
                href="/"
                className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
                <span>На главную</span>
            </a>
        </div>
    )
}
