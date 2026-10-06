import { PropsWithChildren, ReactNode } from "react";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar/DashboardSidebar";

import styles from './Dashboard.module.scss'

interface ILayoutRoot extends PropsWithChildren<unknown> {
    children: ReactNode
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