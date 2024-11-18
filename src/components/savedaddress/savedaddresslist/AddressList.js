import React from 'react'
import Address from '../address/Address'

const AddressList = ({address,setAddressRecordId}) => {
  return (
    <div>
      {
        address.map((item, index) => (
         <Address
          key={index}
          item={item}
          setAddressRecordId={setAddressRecordId}
         />
        ))
      }
    </div>
  )
}

export default AddressList
