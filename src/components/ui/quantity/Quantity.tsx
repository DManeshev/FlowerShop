import styles from './Quantity.module.scss';
import clsx from 'clsx';

interface ICount {
    count: number
    productId: number
    handleCount: (count: number, productId: number) => void
    size?: 'large' | 'medium' | 'small'
}

const QuantityContainer = ({ count, handleCount, productId, size = 'medium' }: ICount) => {

    return (
        <div className={clsx(styles.quantity, styles[size])}>
            <div className={styles.circle} onClick={() => handleCount(count - 1, productId)}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="ic-actions-add-simple">
                        <g id="Layer">
                            <path id="Vector" d="M14.1608 8H3.49414" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                        </g>
                    </g>
                </svg>
            </div>

            <input type="number" className={styles.quantity__input} value={count} onChange={event => handleCount(+event.target.value === 0 ? 1 : +event.target.value, productId)} />

            <div className={styles.circle} onClick={() => handleCount(count + 1, productId)}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="ic-actions-add-simple">
                        <g id="Layer">
                            <path id="Vector" d="M14.1608 8H3.49414" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                            <path id="Vector_2" d="M8.82812 13.3333V2.66661" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default QuantityContainer