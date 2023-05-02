import React from 'react'
import styles from './input.module.css'

const Input = ({type, setValue, id, label, value, onChange, onBlur, ...props}) => {
  return (
    <div >
    <label className={styles.padding} htmlFor={id}>{label}</label>
    <input  value={value} type={type} onBlur={onBlur} onChange={({target}) => setValue(target.value)} required></input>
    </div>
  )
}

export default Input