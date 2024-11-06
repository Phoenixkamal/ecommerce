import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [userData , setUserData] = useState({})
    const [categoryId,setCategoryId] = useState('')
    const [categories,setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    
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

    
    useEffect(()=>{
        async function getAllCategory(){
            try{
                const response = await api.get('/User/Category')
                if(response.data.status==="OK"){
                    setCategories(response.data.responsedata)
                }
                else{
                    console.log(response.data.message)
                }
            }
            catch(err){
                console.log(err.message)
            }
        }
        
        getAllCategory()
    },[])
    useEffect(()=>{
        async function getAllProducts() {
            try {
                const response = await api.get(`/user/products?categoryid=${categoryId}`)
                if (response.data.status === "OK") {
                    setProducts(response.data.responsedata)
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }

        getAllProducts()
    },[categoryId])

    
    return (
        <DataContext.Provider
            value={{
                validate,
                loginValidation,
                userData,
                setUserData,
                categoryId,
                setCategoryId,
                categories,
                products,
                isAuthenticated,
                setIsAuthenticated
            }}
        >
            {children}
        </DataContext.Provider>
    )
}