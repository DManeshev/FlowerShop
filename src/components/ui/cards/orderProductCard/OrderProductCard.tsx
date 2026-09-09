import Image from 'next/image';

import { IProduct } from '@/services';

import styles from './styles.module.scss';
import { AspectRatio } from '../../aspect-ratio';

interface OrderProductCardProps {
    product: IProduct;
}

export const OrderProductCard = ({ product }: OrderProductCardProps) => {
    return (
        <AspectRatio ratio={9 / 16} className="max-h-30 w-full rounded-lg bg-muted">
            <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="rounded-lg object-cover"
            />
        </AspectRatio>
    )
}

// <div className={styles.products}>
    {/* <div className={styles.products__scroll}>
        <div className={styles.products__cards}>
            {cart.map(({ product }) => (
                <CartCard key={product.id} product={product} setOpen={() => {}} />
            ))}
        </div>
    </div> */}
// </div>