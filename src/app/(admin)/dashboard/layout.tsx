import { PropsWithChildren, ReactNode } from "react";

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar/DashboardSidebar";

import styles from './Dashboard.module.scss'

interface ILayoutRoot extends PropsWithChildren<unknown> {
    children: ReactNode
}

export const metadata = {
    ...NO_INDEX_PAGE
}

export default async function DashboardLayout({ children }: ILayoutRoot) {
    return (
        <div className={styles.content}>
            <DashboardSidebar />

            <div className={styles.content__child}>
                {children}
            </div>
        </div>
    )
}