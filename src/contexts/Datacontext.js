import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [orderId, setOrderId] = useState("")
    const [ordersInfo, setOrdersInfo] = useState(null)
    const [ordersInfoId, setOrdersInfoId] = useState("")
    const [addressRecordId, setAddressRecordId] = useState("")
    const [listView , setListView] = useState(true)
    const [checkOutItem , setCheckOutItem] = useState(null)
    const [cartLength , setCartLength] = useState(0)
    const [cartCount , setCartCount] = useState(0)

    function validate(inputAttr, values, setErrors) {
        let newErr = {}
        inputAttr.forEach((attr) => {
            if (attr.pattern) {
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

    // validation

    function loginValidation(inputAttr, values, setErrors) {
        let newErr = {}
        inputAttr.forEach((attr) => {
            if (values[attr.name] === "") {
                newErr[attr.name] = `${(attr.label).slice(0, -1)} is required `
            }
        })

        setErrors(newErr)

        return Object.keys(newErr).length === 0
    }
    // To get all categories
    useEffect(() => {
        async function getAllCategory() {
            try {
                const response = await api.get('/User/Category')
                if (response.data.status === "OK") {
                    setCategories(response.data.responsedata)
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }

        const cacheData = JSON.parse(localStorage.getItem('userdata'))
        if (cacheData) {
            setUserData(cacheData)
        }

        getAllCategory()
    }, [])

    // To get all products
    useEffect(() => {
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
    }, [categoryId])

    // To get orders info
    useEffect(() => {
        async function getOrdersInfo() {
            try {
                const response = await api.get(`/user/orderdetails?displayid=${ordersInfoId}`)
                if (response.data.status === "OK") {
                    console.log(response.data.responsedata)
                    setOrdersInfo(response.data.responsedata)
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }
        if (ordersInfoId) {
            console.log(ordersInfoId)
            getOrdersInfo()
        }
    }, [ordersInfoId])

    useEffect(()=>{
        setCartCount(cartLength)
    },[cartLength])


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
                orderId,
                setOrderId,
                ordersInfoId,
                setOrdersInfoId,
                ordersInfo,
                setOrdersInfo,
                setAddressRecordId,
                addressRecordId,
                listView,
                setListView,
                checkOutItem,
                setCheckOutItem,
                cartLength,
                setCartLength,
                cartCount,
                setCartCount
            }}
        >
            {children}
        </DataContext.Provider>
    )
}