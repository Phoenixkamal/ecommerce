import React from 'react'
import "./FormInput.css"

const FormInput = (props) => {
    const {errMsg,errors ,inputName, valid,label,value, values, setValues, ...inputprops } = props

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: `${e.target.value}` })
    }
    
    return (
        <>
            <div className="my-form-group mt-2">
                <label htmlFor={inputprops.id}>{label}</label>
                <input className={`my-form-input`}
                    {...inputprops}
                    value={value}
                    onChange={handleChange}
                />
                <div>{errors[inputName] && errors[inputName]}</div>
            </div>
        </>
    )
}

export default FormInput
