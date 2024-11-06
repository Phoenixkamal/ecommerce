import React, { useContext, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

import {DataContext} from '../../../contexts/Datacontext'
import FormInput from '../../../components/forminput/FormInput'
import AuthBanner from '../../../components/authbanner/AuthBanner'
import AuthHeader from '../../../components/authheader/AuthHeader'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const {validate} = useContext(DataContext)
    const pageHeading = "Forgot Password"
    const pageDescription = "Enter the email associated with your account and we’ll send and email to reset your password"
    const pageImage = "https://img.freepik.com/premium-vector/orange-advertising-banner-with-register-now-text-trendy-background-with-geometric-ornament_626143-175.jpg"
    const inputAttr = [
        {
            name: "email",
            label: "Email*",
            type: "email",
            errMsg: "Please enter a valid email address!",
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/s
        }
    ]

    const [values,setValues] = useState({
        email:""
    })

    const [errors , setErrors] = useState({})

    function handleSubmit(e){
        e.preventDefault()
        if(validate(inputAttr,values,setErrors)){
            console.log(values)
            navigate('/otp')
        }
    }
    return (
        <div className='auth-container'>
            <AuthBanner
                imageUrl={pageImage}
                alt={"register"}
            />
            <div className='auth-container-form-wrap'>
                <AuthHeader
                    heading={pageHeading}
                    description={pageDescription}
                />
                <form className='my-form' onSubmit={handleSubmit} noValidate>
                    {
                        inputAttr.map((attr, index) => (
                            <FormInput
                                {...attr}
                                key={index}
                                value={values[attr.name]}
                                values={values}
                                setValues={setValues}
                                inputName = {(attr.name)}
                                errors = {errors}
                            />
                        ))
                    }
                    <div className='sign-auth-btn mt-5'>
                        <button className='auth-submit' type='submit'><span className='icon'><FaArrowRight /></span>Send Mail</button>
                    </div>
                </form>
                <div className='auth-btn-route mt-3'>
                    <span className='mr-2'>Back To</span><Link to="/register">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
