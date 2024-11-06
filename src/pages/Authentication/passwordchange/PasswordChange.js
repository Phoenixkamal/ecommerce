import React, { useContext, useState } from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import AuthBanner from '../../../components/authbanner/AuthBanner';
import AuthHeader from '../../../components/authheader/AuthHeader';
import FormInput from '../../../components/forminput/FormInput';
import { DataContext } from '../../../contexts/Datacontext';

const PasswordChange = () => {
    const { validate } = useContext(DataContext)
    const navigate = useNavigate()
    const pageHeading = "Enter New Password"
    const pageDescription = "Your new password must be different from previously used password."
    const pageImage = "https://img.freepik.com/premium-vector/orange-advertising-banner-with-register-now-text-trendy-background-with-geometric-ornament_626143-175.jpg"

    const [values, setValues] = useState({
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({})

    function handleSubmit(e) {
        e.preventDefault()
        if (validate(inputAttr, values, setErrors)) {
            console.log(values)
            navigate('/login')
        }
    }


    const inputAttr = [
        {
            name: "password",
            label: "Password*",
            type: 'password',
            errMsg: "Password should be at least 8 characters long and include a letter and a number!",
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        {
            name: "confirmPassword",
            label: "Confirm Password*",
            type: 'password',
            errMsg: "Password mismatch",
            required: true,
            pattern: values.password
        }
    ]


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
                                inputName={(attr.name)}
                                errors={errors}
                            />
                        ))
                    }
                    <div className='sign-auth-btn mt-5'>
                        <button className='auth-submit' type='submit'><span className='icon'><FaArrowRight /></span>Continue</button>
                    </div>
                </form>
                <div className='auth-btn-route mt-3'>
                    <span className='mr-2'>Back To</span><Link to="/register">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default PasswordChange
