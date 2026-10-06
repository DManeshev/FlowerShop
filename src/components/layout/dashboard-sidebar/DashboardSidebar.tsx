'use client'

import { usePathname, useRouter } from "next/navigation";

import { dashboardTabs } from "./constants";

import styles from './styles.module.scss'
import clsx from "clsx";

export const DashboardSidebar = () => {
    const router = useRouter();
    const pathname = usePathname()

    return (
        <div className={styles.sidebar}>
            <ul className={styles.list}>
                {dashboardTabs.map((item, index) => (
                    <li key={index}>
                        <button
                            onClick={() => router.push(item.link)}
                            className={clsx(styles.btn, pathname === item.link && styles.active)}
                        >
                            <span>{item.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}