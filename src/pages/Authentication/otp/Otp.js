import React, { useRef, useState } from 'react'
import './Otp.css'
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import AuthHeader from '../../../components/authentication/authheader/AuthHeader';
import AuthBanner from '../../../components/authentication/authbanner/AuthBanner';

const Otp = () => {
    const pageHeading = "Enter Code"
    const pageDescription = "An Authentication Code Has Sent To testing@gmail.com"
    const pageImage = "https://img.freepik.com/premium-vector/orange-advertising-banner-with-register-now-text-trendy-background-with-geometric-ornament_626143-175.jpg"
    const otpRef = useRef([])
    const navigate = useNavigate()
    const [values, setValues] = useState({
        digit_1: "",
        digit_2: "",
        digit_3: "",
        digit_4: ""
    })

    const [error, setError] = useState("")
    const otpAttr = [
        {
            id: "digit-1",
            type: "text",
            name: "digit_1",
            maxLength: "1",
            required: true
        },
        {
            id: "digit-2",
            type: "text",
            name: "digit_2",
            maxLength: "1",
            required: true
        },
        {
            id: "digit-3",
            type: "text",
            name: "digit_3",
            maxLength: "1",
            required: true
        },
        {
            id: "digit-4",
            type: "text",
            name: "digit_4",
            maxLength: "1",
            required: true
        }
    ]

    const handleInput = (e, index) => {
        const nextIndex = otpRef.current[index + 1]
        let value = e.target.value

        if (value >= 0 && nextIndex) {
            nextIndex.focus()
        }
        else if (!/^\d+$/.test(value)) {
            e.target.value = ""
        }
    }

    const handleKeyDown = (e, index) => {
        const prevIndex = otpRef.current[index - 1]
        if (!e.target.value && e.key === "Backspace" && prevIndex) {
            prevIndex.focus()
        }
    }

    function handleChange(e) {
        const newvalues = { ...values, [e.target.name]: e.target.value }
        setValues(newvalues)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let otp = ""
        const otpRegex = /^\d{4}$/
        for (let key in values) {
            if (!values[key]) {
                setError("Please Enter Valid Otp")
            }
            else {
                otp += values[key]
            }
        }
        if (otpRegex.test(otp)) {
            console.log(otp)
            navigate('/newpwd')
        } 

    }

    return (
        <div className='auth-container'>
            <AuthBanner
                imageUrl={pageImage}
                alt={"otp"}
            />
            <div className='auth-container-form-wrap'>
                <AuthHeader
                    heading={pageHeading}
                    description={pageDescription}
                    myclass={"text-center"}
                />
                <form className='my-form' onSubmit={handleSubmit} noValidate>
                    <div className='digit-group'>
                        {
                            otpAttr.map((attr, index) => (
                                <input
                                    key={index}
                                    className='digit-box'
                                    {...attr}
                                    value={values[attr.name]}
                                    ref={(element) => { otpRef.current[index] = element }}
                                    onInput={(e) => { handleInput(e, index) }}
                                    onKeyDown={(e) => { handleKeyDown(e, index) }}
                                    onChange={handleChange}
                                />
                            ))
                        }
                    </div>
                    <div className='text-center'>{error && error}</div>

                    <div className='auth-btn-route'>
                        <span className='mr-2'>If you don’t receive code!</span><Link to="/register">Resend</Link>
                    </div>
                    <div className='sign-auth-btn mt-5'>
                        <button className='auth-submit'> <span className='icon'><FaArrowRight /></span>Verify And Proceed</button>
                    </div>
                </form>
                <div className='auth-btn-route mt-3'>
                    <span className='mr-2'>Back To</span><Link to="/register">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Otp
