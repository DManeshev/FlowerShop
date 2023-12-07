import styles from './Heading.module.scss';

interface IHeading {
  title: string;
  className?: string;
}

const Heading = ({ title, className = '' }: IHeading) => {
  return <h2 className={`${styles.title} ${className}`}>{title}</h2>
}

export default Heading;