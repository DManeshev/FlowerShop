'use client'

import CustomLink from '../ui/btn/link/Link'

import styles from './error.module.scss'

export default function NotFoundProducts() {
    return (
        <div className={styles.error}>
            <div className={styles.error__logo}>
                В настоящее время в данной категории товаров нет
            </div>

            <CustomLink title='На главную' link='/' />
        </div>
    )
}
