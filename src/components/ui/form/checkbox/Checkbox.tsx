import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import styles from './Checkbox.module.scss';

type TypeCheckbox = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
    classes?: string;
}

const Checkbox = (props: TypeCheckbox) => {
    const { label, classes = '' } = props;

    return (
        <label htmlFor={props.id} className={props.disabled ? `${styles.label} ${styles.label__disabled}` : `${styles.label}`}>
            <input 
                type="checkbox"
                className={`${styles.checkbox} ${styles[classes]}`}
                {...props}
            />
            {label ? label : null}
        </label>
    )
}

export default Checkbox