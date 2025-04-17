import React, { useContext, useEffect, useState } from 'react'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'
import { FaAngleRight } from 'react-icons/fa6'
import './SavedAddress.css'
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';
import api from '../../api/api'
import { DataContext } from '../../contexts/Datacontext';
import AddressList from '../../components/savedaddress/savedaddresslist/AddressList'

const SavedAddress = () => {
  const UserData = JSON.parse(localStorage.getItem('userdata'))
  const displayId = UserData.displayId
  const [address, setAddress] = useState([])
  const { setAddressRecordId } = useContext(DataContext)

  useEffect(() => {
    async function GetMyAddresses() {
      try {
        const response = await api.get(`/User/GetMyAddresses?displayid=${displayId}`)
        if (response.data.status === "OK") {
          console.log(response.data.responsedata)
          setAddress(response.data.responsedata)
        }
        else {
          console.log(response.data.message)
        }
      }
      catch (err) {
        console.log(err.message)
      }
    }
    GetMyAddresses()
  }, [displayId])

  return (
    <div className='saved-address'>
      <SecondaryHeader
        title={"Delivery Address"}
      />
      <main className='saved-address-contents'>
       <AddressList
        address={address}
        setAddressRecordId={setAddressRecordId}
       />
        <Link className='add-address-btn' to='/dashboard/addaddress'><MdAddCircleOutline className='first-child' /> <p className='second-child'>Add Address</p> <FaAngleRight className='third-child' /></Link>
      </main>
    </div>
  )
}

export default SavedAddress
