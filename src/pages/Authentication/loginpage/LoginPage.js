import React, { useContext, useState } from 'react'
import "./LoginPage.css"
import { FaArrowRight } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import AuthBanner from '../../../components/authentication/authbanner/AuthBanner';
import AuthHeader from '../../../components/authentication/authheader/AuthHeader';
import FormInput from '../../../components/forminput/FormInput';
import { DataContext } from '../../../contexts/Datacontext';
import api from '../../../api/api';

const LoginPage = () => {
    const { loginValidation,setUserData,setRole} = useContext(DataContext)
    const pageHeading = "Sign in to your account"
    const pageDescription = "Welcome Back You've Been Missed!"
    const navigate = useNavigate()
    // const pageImage = "https://www.powertrafic.fr/wp-content/uploads/2023/04/image-ia-exemple.png"
    const pageImage ='https://www.salesfire.co.uk/wp-content/uploads/2023/01/What-Is-D2C-eCommerce-and-Why-is-it-Key-to-Customer-Engagement-Image-1024x692.jpeg'
    const inputAttr = [
        {
            name: "username",
            label: "Username*",
            type: "text",
            required: true
        },
        {
            name: "password",
            label: "Password*",
            type: 'password',
            required: true
        },
    ]
    const [values, setValues] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
    const [error, setError] = useState("")

    async function login(email, password) {
        try {
            const response = await api.post('/Authentication/Login', { username: email, password: password })
            if (response.data.status === "OK") {
                console.log(response.data.responsedata)
                setUserData(response.data.responsedata)
                setRole(response.data.responsedata.role)
                localStorage.setItem('userdata',JSON.stringify(response.data.responsedata))
                localStorage.setItem("token",response.data.responsedata.accessToken)
                navigate('/dashboard')
            }
            else {
                setError(response.data.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (loginValidation(inputAttr, values, setErrors)) {
            login(values.username, values.password)
        }
    }

    return (
        <div className='auth-container'>
            <AuthBanner
                imageUrl={pageImage}
                alt={"login"}
            />
            <div className='auth-container-form-wrap'>
                <AuthHeader
                    heading={pageHeading}
                    description={pageDescription}
                />
                <form className='my-form' onSubmit={handleSubmit} noValidate>
                    <div className='input-wrap'>
                        {
                            inputAttr.map((attr, index) => (
                                <FormInput
                                    key={index}
                                    {...attr}
                                    value={values[attr.name]}
                                    values={values}
                                    setValues={setValues}
                                    inputName={(attr.name)}
                                    errors={errors}
                                />
                            ))
                        }

                        <div className='forgot-pwd mb-3'>
                            <div className='error'>  
                                {
                                    error && error
                                }
                            </div>
                            <Link to="/forgotpassword"><p>Forgot password</p></Link>
                        </div>
                    </div>
                    <div className='sign-auth-btn'>
                        <button className='auth-submit' type='submit'> <span className='icon'><FaArrowRight /></span> Sign In</button>
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
                        <span className='mr-2'>Not a member?</span><Link to="/register">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
