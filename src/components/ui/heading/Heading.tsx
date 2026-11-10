import styles from './Heading.module.scss';

interface IHeading {
  title: string;
  className?: string;
}

const Heading = ({ title, className = '' }: IHeading) => {
  return <h1 className={`${styles.title} ${className}`}>{title}</h1>
}

export default Heading;