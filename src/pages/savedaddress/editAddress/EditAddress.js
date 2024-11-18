import React, { useContext, useEffect, useState } from 'react'
import SecondaryHeader from '../../../components/secondaryheader/SecondaryHeader'
import FormInput from '../../../components/forminput/FormInput'
import api from '../../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { DataContext } from '../../../contexts/Datacontext'

const EditAddress = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState({})
    const {recordid} = useParams()

    const [contactValues, setContactValues] = useState({
        fullname: address.name,
        mobile: address.phoneno
    })
    const [addressValues, setAddressValues] = useState({
        house: address.address1,
        road: address.address2,
        pincode: address.zipcode,
        city: address.city,
        state: address.state,
        nearby: address.address3
    })
    const [place, setPlace] = useState(address)

    const errors = {}

    const contactFormAttr = [
        {
            id: "fullname",
            name: "fullname",
            label: "Full Name",
            type: "text",
        },
        {
            id: "mobile",
            name: "mobile",
            label: "Mobile No",
            type: "text",
        },
    ]
    const addressFormAttr = [
        {
            id: "house",
            name: "house",
            label: "House No / Building Name",
            type: "text",
            errMsg:""
        },
        {
            id: "road",
            name: "road",
            label: "Road Name / Area / Colony",
            type: "text",
            errMsg:""
        },
        {
            id: "pincode",
            name: "pincode",
            label: "Pin Code",
            type: "text",
            errMsg:""
        },
        {
            id: "city",
            name: "city",
            label: "City/District",
            type: "text",
            errMsg:""
        },
        {
            id: "state",
            name: "state",
            label: "State",
            type: "text",
            errMsg:""
        },
        {
            id: "nearby",
            name: "nearby",
            label: "Nearby Famous Place/Shop",
            type: "text",
            errMsg:""
        }
        
    ]
    
    const UserData = JSON.parse(localStorage.getItem('userdata'))
    const [clicked, setClicked] = useState({ home: "", shop: "", office: "" })
    
    function handleClick(e) {
        setClicked({
            [e.target.name]: e.target.value
        })
        setPlace(e.target.value)
    }

    async function updateMyAddresses() {
        const data = {
            mode: "update",
            displayid: UserData.displayId,
            recordid: recordid,
            displayid: UserData.displayId,
            name: contactValues.fullname,
            phoneno: contactValues.mobile,
            address1: addressValues.house,
            address2: addressValues.road,
            address3: addressValues.nearby,
            city: addressValues.city,
            state: addressValues.state,
            zipcode: addressValues.pincode,
            type: place
        }

        if (recordid) {
            try {
                const response = await api.post(`/User/UpsetAddress`, data)
                if (response.data.status === "OK") {
                    console.log(response)
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (err) {
                console.log(err.message)
            }
        }

        navigate(-1)
    }

    useEffect(() => {
        async function getAddress() {
            try {
                const response = await api.get(`/user/getuseraddress?mode=update&recordid=${recordid}`)
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
        getAddress()
    }, [])


    useEffect(() => {
        setContactValues({
            fullname: address.name,
            mobile: address.phoneno
        })
        setAddressValues({
            house: address.address1,
            road: address.address2,
            pincode: address.zipcode,
            city: address.city,
            state: address.state,
            nearby: address.address3
        })
    }, [address])

    return (
        <section className='edit-profile addaddress'>
            <SecondaryHeader
                title={'Edit Profile'}
            />
            <main className='addadress-content'>
                <form className='my-form mb-3'>
                    <h6 className='form-title'>Contact Details</h6>
                    {
                        contactFormAttr.map((attr, index) => (
                            <FormInput
                                {...attr}
                                key={index}
                                value={contactValues[attr.name]}
                                values={contactValues}
                                setValues={setContactValues}
                                inputName={(attr.name)}
                                errors={errors}
                            />
                        ))
                    }
                    <h6 className='form-title'>Address</h6>
                    {
                        addressFormAttr.map((attr, index) => (
                            <FormInput
                                {...attr}
                                key={index}
                                value={addressValues[attr.name]}
                                values={addressValues}
                                setValues={setAddressValues}
                                inputName={(attr.name)}
                                errors={errors}
                            />
                        ))
                    }
                </form>
                <h5 className='form-title'>Save Address As</h5>
                <div className='save-address-options'>
                    <button className={`category-name save-address-option ${clicked.home ? "save-address-option-btn-active" : ""}`} value={"home"} onClick={handleClick} name='home'>
                        Home
                    </button>
                    <button className={`category-name save-address-option ${clicked.shop ? "save-address-option-btn-active" : ""}`} value={"shop"} name='shop' onClick={handleClick}>
                        Shop
                    </button>
                    <button className={`category-name save-address-option ${clicked.office ? "save-address-option-btn-active" : ""}`} value={"office"} name='office' onClick={handleClick}>
                        Office
                    </button>
                </div>
                    <button className='update-profile-btn save-address' onClick={updateMyAddresses}>
                        Save address
                    </button>
            </main>
        </section>
    )
}

export default EditAddress
