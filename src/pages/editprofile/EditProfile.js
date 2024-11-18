import React, { useContext, useEffect, useState } from 'react'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'
import FormInput from '../../components/forminput/FormInput'
import { DataContext } from '../../contexts/Datacontext'
import './EditProfile.css'
import { LuPencil } from "react-icons/lu";
import api from '../../api/api'
import { useNavigate } from 'react-router-dom'
import optionalImage from '../../assets/images/product-card-img-1.png'

const EditProfile = () => {
  const { validate } = useContext(DataContext)
  const UserData = JSON.parse(localStorage.getItem('userdata'))
  const navigate = useNavigate()

  const userData = JSON.parse(localStorage.getItem('userdata'))

    let profileImage;
    
    try {
        const imageName = userData.profileImage.slice('/assets/custom-assets/Image/'.length)
        profileImage = require(`../../assets/UploadedImages/profileimages/${imageName}`);
    } catch (error) {
        console.log(error.message)
        profileImage = optionalImage;
    }

  const [values, setValues] = useState({
    username: UserData.userName,
    mobile: UserData.phoneNo,
    email: UserData.email,
    password: UserData.password
  })

  const [errors, setErrors] = useState({})
  const inputAttr = [
    {
      id: "username",
      name: "username",
      label: "User Name*",
      type: 'text',
      errMsg: "Username must be 3-26 characters and should not include special characters!",
      pattern: '^[a-zA-Z0-9_]{3,26}$'
    },
    {
      id: "mobile",
      name: "mobile",
      label: "Mobile Number*",
      type: 'number',
      errMsg: "Please Enter a Valid Mobile Number",
    },
    {
      id: "email",
      name: "email",
      label: "Email*",
      type: "email",
      errMsg: "Please enter a valid email address.",
    },
    {
      id: "password",
      name: "password",
      label: "Password*",
      type: 'password',
      errMsg: "Password must be at least 8 characters long, with at least one letter and one number.",
    },
  ]



  async function handleSubmit(e) {
    e.preventDefault()
    console.log(validate(inputAttr, values, setErrors))
    if (validate(inputAttr, values, setErrors)) {
      console.log(values)
      const updateData = {
        userdisplayid: UserData.displayId,
        name: values.username,
        email: values.email,
        phoneno: values.mobile,
        password: values.password
      }

      try{
        await api.post('/user/updateprofile',updateData)
      }
      catch(err){
        console.log(err.message)
      }
      localStorage.removeItem("userdata")
      navigate('/login')
    }
  }

  const [selectedFile , setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  useEffect(()=>{
    console.log(selectedFile)
  },[selectedFile])
  return (
    <section className='edit-profile'>
      <SecondaryHeader
        title={'Edit Profile'}
      />
      <main className='edit-profile-content'>
        <div className='profile-picture'>
          <div className='profile-change-outline'>
            <div className='profile-change'>
              <img src={profileImage} alt='profile' />
            </div>
            <div className='edit-btn-outline'>
              <div className='profile-edit-btn'>
                <input type='file' className='fileinput' onChange={handleFileChange} accept='.jpg .png .jpeg' />
                <LuPencil className='pencil-icon' />
              </div>
            </div>
          </div>
        </div>
        <form className='my-form' onSubmit={handleSubmit}>
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
          <button className='update-profile-btn' type='submit'>
            Update Profile
          </button>
        </form>
      </main>
    </section>
  )
}

export default EditProfile
