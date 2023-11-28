import styles from './Spinner.module.scss'

interface ISpinner {}

export default function Spinner({}: ISpinner) {
    return (
        <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    )
}
