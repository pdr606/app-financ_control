import React from 'react'
import styles from './radio.module.css'

const Radio = ({options, value, setValue, ...props}) => {
  return (
    <div>
    {options.map((option) =>(
        <label className={styles.padding} key={option}>
            <input  type='radio' required  checked={value === option} value={option} onChange={({target}) => setValue(target.value)} />
            {option}
        </label>
    ))}

    </div>
  )
}

export default Radio