import React, { useContext } from 'react'
import { IoSearch } from 'react-icons/io5';
import ReturnBack from '../returnback/ReturnBack';
import { FaChevronLeft } from 'react-icons/fa6';
import { FaListUl } from "react-icons/fa6";
import { BsGridFill } from "react-icons/bs";
import { DataContext } from '../../contexts/Datacontext';

const SearchHeader = ({ title, viewType,search,setSearch }) => {
    const { listView, setListView } = useContext(DataContext)

    function handleClick() {
        setListView(!listView)
    }
    return (
        <header className='product-page-header product-header'>
            <ReturnBack>
                <FaChevronLeft />
            </ReturnBack>
            <div className='search-box-wrap'>
                <div className='search-icon'>
                    <IoSearch />
                </div>
                <form className='search-box'>
                    <input 
                        type='text' 
                        placeholder={title}
                        value={search}
                        onChange={(e)=>{setSearch(e.target.value)}} 
                    />
                </form>
            </div>
            {
                viewType && <div className='view-type'>
                    {
                        listView ? <FaListUl onClick={handleClick} /> : <BsGridFill onClick={handleClick} />
                    }
                </div>
            }
        </header>
    )
}

export default SearchHeader
