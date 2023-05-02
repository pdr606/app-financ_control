import React from 'react'

const Input = ({type, setValue, id, label, value, onChange, onBlur, ...props}) => {
  return (
    <>
    <label htmlFor={id}>{label}</label>
    <input value={value} type={type} onBlur={onBlur} onChange={({target}) => setValue(target.value)} required></input>
    </>
  )
}

export default Input