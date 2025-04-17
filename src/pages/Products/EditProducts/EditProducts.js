import React, { useContext } from 'react'
import { DataContext } from '../../../contexts/Datacontext'
import EditCategoryList from '../../../components/products/EditCategoryList/EditCategoryList'
import SecondaryHeader from '../../../components/secondaryheader/SecondaryHeader'

const EditProducts = () => {
    const { categories } = useContext(DataContext)
    return (
        <div className='edit-category'>
             <SecondaryHeader
                title={'Products'}
            />
            <ul className='edit-category-list'>
                {
                    categories.map((category, index) => (
                        <EditCategoryList
                            category={category}
                            key={index}
                            editbtn={false}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default EditProducts
