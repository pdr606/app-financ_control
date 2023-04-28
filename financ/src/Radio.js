import React from 'react'

const Radio = ({options, value, setValue, ...props}) => {
  return (
    <>
    {options.map((option) =>(
        <label key={option}>
            <input type='radio'  checked={value === option} value={option} onChange={({target}) => setValue(target.value)} />
            {option}
        </label>
    ))}

    </>
  )
}

export default Radio