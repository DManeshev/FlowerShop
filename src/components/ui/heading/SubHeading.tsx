import styles from './Heading.module.scss';

interface ISubHeading {
  title: string;
  className?: string;
}

const SubHeading = ({ title, className = '' }: ISubHeading) => {
  return <h2 className={`${styles.subtitle} ${className}`}>{title}</h2>
}

export default SubHeading;