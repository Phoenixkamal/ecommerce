import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [categories, setCategories] = useState([])
    const [orderId, setOrderId] = useState("")
    const [addressRecordId, setAddressRecordId] = useState("")
    const [listView , setListView] = useState(true)
    const [checkOutItem , setCheckOutItem] = useState(null)
    const [cartLength , setCartLength] = useState(0)
    const [cartCount , setCartCount] = useState(0)
    const [role,setRole] = useState("")


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
    useEffect(()=>{
        const cacheData = JSON.parse(localStorage.getItem('userdata'))
        setUserData(cacheData)
    },[])
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

        getAllCategory()
    }, [userData])


    useEffect(()=>{
        setCartCount(cartLength)
    },[cartLength])

    useEffect(() => {
        async function getCartItems() {
          if (userData.cartDisplayId) {
            try {
              const response = await api.get(`/User/CartDetails?displayid=${userData.cartDisplayId}`)
              if (response.data.status === "OK") {
                setCartLength(response.data.responsedata.lines.length)
              }
              else {
                console.log(response.data.message)
              }
            }
            catch (err) {
              console.log(err.message)
            }
          }
        }
        getCartItems()
      }, [userData.cartDisplayId])

          const [WishlistProducts, setWhislistProducts] = useState([])
          const [wishlistCounterRefresh ,setWishlistCounterRefresh] = useState(true)
          const [activeWishlist,setActiveWishlist] = useState([])

          const userDisId = JSON.parse(localStorage.getItem('userdata')).displayId
      
          useEffect(() => {
              async function getWishlistProducts() {
                  try {
                      if (!userDisId) {
                          console.log("User data or displayId is missing");
                          return;
                      }
      
                      const response = await api.get(`/User/Wishlist?action=fetch&userid=${userDisId}`);
                      if(response.data.responsedata){
                        setWhislistProducts(response.data.responsedata);
                      }
                      else{
                        setWhislistProducts([])
                      }
                  } catch (err) {
                      console.log("Error fetching wishlist products:", err.message);
                  }
              }
      
              getWishlistProducts();
          }, [userDisId,wishlistCounterRefresh]);

          useEffect(()=>{
            const productIds = WishlistProducts.map(item => item.productId);
            setActiveWishlist(productIds)
            },[WishlistProducts,wishlistCounterRefresh])


    return (
        <DataContext.Provider
            value={{
                setWishlistCounterRefresh,
                wishlistCounterRefresh,
                activeWishlist,
                role,
                setRole,
                validate,
                loginValidation,
                userData,
                setUserData,
                categories,
                orderId,
                setOrderId,
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