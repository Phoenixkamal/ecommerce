import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import SearchHeader from '../../components/searchHeader/SearchHeader'
import ProductsList from '../../components/products/productslist/ProductsList'

const Wishlist = () => {
    const userData = JSON.parse(localStorage.getItem('userdata'))


    const [search, setSearch] = useState("")
    function filterProducts() {
        return products.filter((item) => item.productName.toLowerCase().includes(search.toLowerCase()))
    }

    const [products, setProducts] = useState([])
    const [counterRefresh ,setCounterRefresh] = useState(true)

    useEffect(() => {
        async function getWishlistProducts() {
            try {
                // Check if userData and userData.displayId are defined
                if (!userData || !userData.displayId) {
                    console.log("User data or displayId is missing");
                    return;
                }

                const response = await api.get(`/User/Wishlist?action=fetch&userid=${userData.displayId}`);
                if(response.data.responsedata){
                    setProducts(response.data.responsedata);
                }
                else{
                    setProducts([])
                }
            } catch (err) {
                console.log("Error fetching wishlist products:", err.message);
            }
        }

        getWishlistProducts();
    }, [userData.displayId,counterRefresh,userData]);


    useEffect(() => { console.log(products) }, [products])
    return (
        <div className='products-page'>
            <SearchHeader
                title={"Search Wishlist"}
                viewType={true}
                search={search}
                setSearch={setSearch}
                viewbtn={false}
            />
            <div className='category-page-content'>
                {
                    products.length ?(

                        <ProductsList
                            products={filterProducts()}
                            search={search}
                            withTrash={true}
                            setCounterRefresh={setCounterRefresh}
                            counterRefresh={counterRefresh}
                        />
                    )
                    :(
                        <div className='cart-is-empty'>Your Wishlist Is Empty</div>
                    )
                }
            </div>
        </div>
    )
}

export default Wishlist
