import Link from "next/link";

import styles from './Link.module.scss';

interface ICustomLink { 
    link: string;
    title?: string;
    arrow?: boolean;
    classNames?: string;
}

const CustomLink = ({ link, title, arrow = false, classNames = '' }: ICustomLink) => {

    return (
        <Link href={link} className={`${styles.link} ${styles[classNames]}`}>
            { title ? <span>{title}</span> : null }

            {arrow ?
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5332 8.18666L4.2732 5.44666C4.39737 5.32175 4.46706 5.15279 4.46706 4.97666C4.46706 4.80054 4.39737 4.63157 4.2732 4.50666L1.60654 1.84" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="bevel"/>
                </svg>
                : 
                null
            }
        </Link>
    )
}

export default CustomLink;