import React, {  useState } from 'react'
import SecondaryHeader from '../../../components/secondaryheader/SecondaryHeader'
import FormInput from '../../../components/forminput/FormInput'
import './AddAddress.css'
import api from '../../../api/api'
import { useNavigate } from 'react-router-dom'

const AddAddress = () => {
    const navigate = useNavigate()
    const UserData = JSON.parse(localStorage.getItem('userdata'))
    const [place, setPlace] = useState("")
    const errors = {}

    const [contactValues, setContactValues] = useState({
        fullname: "",
        mobile: ""
    })
    const [addressValues, setAddressValues] = useState({
        house: "",
        road: "",
        pincode: "",
        city: "",
        state: "",
        nearby: ""
    })

    const [clicked, setClicked] = useState({ home: "", shop: "", office: "" })
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
        },
        {
            id: "road",
            name: "road",
            label: "Road Name / Area / Colony",
            type: "text",
        },
        {
            id: "pincode",
            name: "pincode",
            label: "Pin Code",
            type: "text",
        },
        {
            id: "city",
            name: "city",
            label: "City/District",
            type: "text",
        },
        {
            id: "state",
            name: "state",
            label: "State",
            type: "text",
        },
        {
            id: "nearby",
            name: "nearby",
            label: "Nearby Famous Place/Shop",
            type: "text",
        }

    ]


    function handleClick(e) {
        setClicked({
            [e.target.name]: e.target.value
        })
        setPlace(e.target.value)
    }


    async function GetMyAddresses() {
        const data = {
            mode: "addnew",
            displayid: UserData.displayId,
            recordid: '-999',
            name: contactValues.fullname,
            phoneno: contactValues.mobile,
            address1: addressValues.house,
            address2: addressValues.road,
            address3: addressValues.nearby,
            city: addressValues.city,
            state: addressValues.state,
            zipcode: addressValues.pincode,
            type: place
        };
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

        navigate(-1)
    }


    return (
        <section className='edit-profile addaddress'>
            <SecondaryHeader
                title={'Add Address'}
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
                <button className='update-profile-btn save-address' onClick={GetMyAddresses}>
                    Save address
                </button>
            </main>
        </section>
    )
}

export default AddAddress
