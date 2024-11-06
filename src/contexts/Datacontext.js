import React, { createContext, useState } from "react";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [userData , setUserData] = useState({})
    
    function validate(inputAttr,values,setErrors) {
        let newErr = {}
        inputAttr.forEach((attr) => {
            if(attr.pattern){
                let pattern = new RegExp(attr.pattern)
                if (values[attr.name] === "") {
                    newErr[attr.name] = `${(attr.label).slice(0, -1)} is required `
                }
                else if (!pattern.test(values[attr.name])) {
                    newErr[attr.name] = attr.errMsg
                }
            }
        })

        setErrors(newErr)

        return Object.keys(newErr).length === 0
    }

    function loginValidation(inputAttr,values,setErrors){
        let newErr = {}
        inputAttr.forEach((attr) => {
            if (values[attr.name] === "") {
                newErr[attr.name] = `${(attr.label).slice(0, -1)} is required `
            }
        })

        setErrors(newErr)

        return Object.keys(newErr).length === 0
    }
    return (
        <DataContext.Provider
            value={{
                validate,
                loginValidation,
                userData,
                setUserData
            }}
        >
            {children}
        </DataContext.Provider>
    )
}