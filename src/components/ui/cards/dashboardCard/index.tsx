import { useRouter } from 'next/navigation'
import clsx from 'clsx';

import { IProduct } from '@/services';
import { formatPrice } from '@/lib/utils'

import styles from './styles.module.scss';

interface DashboardCardProps {
    product: IProduct
}

export const DashboardCard = (props: DashboardCardProps) => {
    const { product } = props;

    const router = useRouter()
    
    const handleUpdateProduct = (id: number) => {
        router.push(`/dashboard/productaction?productId=${id}`)
    }

    return (
        <div
            onClick={() => handleUpdateProduct(product.id)}
            className={styles.product}
        >
            <div className={styles.cell}>
                <span>{product.name}</span>
            </div>

            <div className={clsx(styles.cell, styles.price)}>
                <span>{formatPrice(product.price)}</span>
            </div>
        </div>
    )
}