import React, { useEffect, useState } from 'react'
import SecondaryHeader from '../../../components/secondaryheader/SecondaryHeader'
import FormInput from '../../../components/forminput/FormInput'
import api from '../../../api/api'
import { useNavigate, useParams } from 'react-router-dom'

const EditAddress = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState({})
    const { recordid } = useParams()
    const addressType = [
            'home',
            'office',
            'shop'
        ]

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
            errMsg: ""
        },
        {
            id: "road",
            name: "road",
            label: "Road Name / Area / Colony",
            type: "text",
            errMsg: ""
        },
        {
            id: "pincode",
            name: "pincode",
            label: "Pin Code",
            type: "text",
            errMsg: ""
        },
        {
            id: "city",
            name: "city",
            label: "City/District",
            type: "text",
            errMsg: ""
        },
        {
            id: "state",
            name: "state",
            label: "State",
            type: "text",
            errMsg: ""
        },
        {
            id: "nearby",
            name: "nearby",
            label: "Nearby Famous Place/Shop",
            type: "text",
            errMsg: ""
        }

    ]
    const UserData = JSON.parse(localStorage.getItem('userdata'))
    async function updateMyAddresses() {
        const data = {
            mode: "update",
            displayid: UserData.displayId,
            recordid: recordid,// eslint-disable-next-line
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
                console.log(response)
                if (response.status === 200) {
                    navigate(-1)
                }
            }
            catch (err) {
                console.log(err.message)
                alert("You are Missing Something")
            }
        }

    }

    useEffect(() => {
        async function getAddress() {
            try {
                const response = await api.get(`/user/getuseraddress?mode=update&recordid=${recordid}`)
                if (response.data.status === "OK") {
                    console.log(response.data.responsedata)
                    setAddress(response.data.responsedata)
                    setPlace(response.data.responsedata.type)
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
    }, [recordid])


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

    function handleRadioChange(e) {
        setPlace(e.target.value)
    }

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
                                value={contactValues[attr.name] || ""}
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
                                value={addressValues[attr.name] || ""}
                                values={addressValues}
                                setValues={setAddressValues}
                                inputName={(attr.name)}
                                errors={errors}
                            />
                        ))
                    }
                </form>
                <h5 className='form-title'>Save Address As</h5>
                <div className='varianceList'>
                    {
                        addressType.map((location, index) => (
                            <label className='product-list-variance  product-insight-variance mx-2' key={index}>
                                <input className='variance-radio-input' type="radio" value={location} name={location} checked={place === location} onChange={handleRadioChange} />
                                <span className={`category-name save-address-option mr-2  insight-save-address-option`}>
                                    <span className='mr-1 text-capitalize'>{location}</span>
                                </span>
                            </label>
                        ))
                    }
                </div>
                <button className='update-profile-btn save-address' onClick={updateMyAddresses}>
                    Save address
                </button>
            </main>
        </section>
    )
}

export default EditAddress
