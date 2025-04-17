import React, { useEffect, useState } from 'react'
import { LuHome } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import api from '../../../api/api'

const Address = ({item,setAddressRecordId}) => {
    const [isChecked , setIsChecked] = useState(false)
    const UserData = JSON.parse(localStorage.getItem('userdata'))
    useEffect(()=>{
        function toCheck(){
            if(item.recordId === item.defaultAddressId){
                setIsChecked(true)
            }
        }
        toCheck()
    },[item])
    async function handleClick(e) {
        try {
          const response = await api.put(`/user/changeaddress?displayid=${UserData.displayId}&recordid=${e.target.value}`)
          console.log(response)
          if(response.status ===200){
            setIsChecked(true)
          }
        }
        catch (err) {
          console.log(err.message)
        }
      }
    return (
        <div>
            <div className='saved-address-content-1'>
                <div className='saved-address-content-icon'>
                    <LuHome />
                </div>
                <div className='content-wrapper'>
                    <div className='address-block'>
                        <div className='saved-address-content-name'>
                            <h5>{(item.username)}</h5>
                        </div>
                        <div className='saved-address-content-address'>
                            <p>
                                {item.address1}<br></br>
                                {item.address2},<br></br>
                                {item.city}-{item.zipcode}
                            </p>
                        </div>
                        <div className='saved-address-edit-btn'>
                            <Link to={`/dashboard/editaddress/${item.recordId}`}><button onClick={() => { setAddressRecordId(item.recordId) }} value={item.recordId}>Edit</button></Link>
                        </div>
                    </div>
                </div>
                <label className="custom-radio">
                    <input type="radio" name="option" onChange={handleClick} checked={isChecked} value={item.recordId} />
                    <span className="radio-mark"></span>
                </label>
            </div>
        </div>
    )
}

export default Address
