import { ChangeEvent, useState } from 'react';

import Field from '../input/Input';

import styles from './Range.module.scss';

const Range = () => {
    const [ values, setValues ] = useState({
        first: 0,
        second: 2000
    });

    return (
        <div>
            <div className='w-[15em] flex items-center justify-between'>
                <div>0</div>
                <div>10000</div>
            </div>
            <div className={styles.wrap} role='group' aria-labelledby='multi-lbl' style={{'--a': values.first, '--b': values.second, }}>
                <label htmlFor="a" className={styles.label}></label>
                <input 
                    type="range" 
                    id="a" 
                    min={0} max={10000} 
                    className={styles.input} 
                    onInput={(event: ChangeEvent<HTMLInputElement>) => setValues({ ...values, first: +event.target.value })}
                    value={values.first}
                />

                <label htmlFor="b" className={styles.label}></label>
                <input 
                    type="range" 
                    id="b" 
                    min={0} max={10000} 
                    className={styles.input} 
                    onInput={(event: ChangeEvent<HTMLInputElement>) => setValues({ ...values, second: +event.target.value })}
                    value={values.second}
                />
            </div>

            <div className='w-[15em] flex items-center justify-between gap-8'>
                <Field 
                    type='number' 
                    classes='small' 
                    value={values.first} 
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setValues({ ...values, first: +event.target.value})}
                    min={0}
                    max={10000}
                />
                <Field 
                    type='number' 
                    classes='small' 
                    value={values.second} 
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setValues({ ...values, second: +event.target.value})}
                    min={0}    
                    max={10000}
                />
            </div>
        </div>
    )
}

export default Range;