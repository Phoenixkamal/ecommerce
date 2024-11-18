import React from 'react'
import ReturnBack from '../returnback/ReturnBack'
import { FaChevronLeft } from 'react-icons/fa6'
import './SecondaryHeader.css'

const SecondaryHeader = ({ title }) => {
    return (
        <header className='secondary-header header product-header'>
            <ReturnBack>
                <FaChevronLeft />
            </ReturnBack>
            <div className='secondary-header-title'>
                {title}
            </div>
        </header>
    )
}

export default SecondaryHeader
