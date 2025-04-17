import React, { useContext, useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import api from '../../../api/api'
import { DataContext } from '../../../contexts/Datacontext'

const  WishlistComp = ({ setWishlistCounterRefresh, wishlistCounterRefresh, productId, userDisplayId}) => {
    const [prodActiveWishlist, setProdActiveWishlist] = useState(false)
    const {activeWishlist} = useContext(DataContext)

    useEffect   (() => {
        if (activeWishlist.includes(productId)) {
            setProdActiveWishlist(true)
        } else {
            setProdActiveWishlist(false)
        }
    }, [activeWishlist,productId])

    async function handleWhislistClck(id, userDisplayId) {
        try {
            const response = await api.get(`/User/Wishlist?action=add&userid=${userDisplayId}&productid=${id}`)
            console.log(response)
            if (response.data.code === 200) {
                setProdActiveWishlist(!prodActiveWishlist)
                setWishlistCounterRefresh(!wishlistCounterRefresh)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <div className='whistlist' onClick={() => handleWhislistClck(productId, userDisplayId)}>
            {
                prodActiveWishlist ?
                    <FaHeart /> : <FaRegHeart />
            }
        </div>
    )
}

export default WishlistComp
