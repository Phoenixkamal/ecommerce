import React from 'react'

const FormDropDown = ({disabled,selectedOption,setSelectedOption,dropdownMap}) => {
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };
    return (
        <select
            value={selectedOption}
            onChange={handleChange}
            className='inp-select'
            disabled={disabled}
        >
            <option value="">--Select an option--</option>
            {
                dropdownMap &&
                dropdownMap.map(([key, value]) =>
                    <option key={key} value={key}>
                        {value}
                    </option>
                )
            }
        </select>
    )
}

export default FormDropDown
