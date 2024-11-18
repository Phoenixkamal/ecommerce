import React, { useContext, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link } from 'react-router-dom';
import FormInput from '../../../components/forminput/FormInput';
import AuthHeader from '../../../components/authentication/authheader/AuthHeader';
import AuthBanner from '../../../components/authentication/authbanner/AuthBanner';
import { DataContext } from '../../../contexts/Datacontext';


const RegisterPage = () => {
    const {validate} = useContext(DataContext)
    const pageHeading = "Create Your Account"
    const pageDescription = "Welcome Back ! Please Enter Your Details"
    const pageImage = "https://img.freepik.com/premium-vector/orange-advertising-banner-with-register-now-text-trendy-background-with-geometric-ornament_626143-175.jpg"

    const [values,setValues] = useState({
        name:"",
        email:"",
        password:""
    })

    const [errors , setErrors] = useState({})
    const inputAttr = [
        {
            id:"name",
            name: "name",
            label: "Name*",
            type: 'text',
            errMsg:"Username must be 3-26 characters and should not include special characters!",
            pattern: '^[a-zA-Z0-9_]{3,26}$'
        },
        {
            id:"email",
            name: "email",
            label: "Email*",
            type: "email",
            errMsg: "Please enter a valid email address.",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        {
            id:"password",
            name: "password",
            label: "Password*",
            type: 'password',
            errMsg: "Password must be at least 8 characters long, with at least one letter and one number.",
            pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'
        },
    ]

    
    
    function handleSubmit(e){
        e.preventDefault()
        if(validate(inputAttr,values,setErrors)){
            console.log(values)
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
                    <div className='my-form-checkbox'>
                        <div className='my-form-check'>
                            <input className='checkbox' type='checkbox' />
                        </div>
                        <span>I agree to all Term, Privacy and Fees</span>
                    </div>
                    <div className='sign-auth-btn'>
                        <button className='auth-submit' type='submit'> <span className='icon'><FaArrowRight /></span> Sign Up</button>
                    </div>
                </form>
                <div className='section-footer'>
                    <div className='continue-with-txt'>
                        <span>Or Continue With</span>
                    </div>
                    <div className='auth-btn-options'>
                        <div className='auth-btn-wrap'>
                            <button className='auth-btn'> <FcGoogle /> Sign In With Google</button>
                        </div>
                        <div className='auth-btn-wrap'>
                            <button className='auth-btn'><FaApple /> Sign In With Apple</button>
                        </div>
                    </div>
                    <div className='auth-btn-route'>
                        <span className='mr-2'>Already have and account?</span><Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
