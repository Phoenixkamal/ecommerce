import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/api'
import FormInput from '../../components/forminput/FormInput'
import FormDropDown from '../../components/dropdown/FormDropDown'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'

const EditUsers = () => {
  const { id } = useParams()
  const [userDetails, setUserDetails] = useState('')
  const [rolesdrpdwn,setRolesdrpdwn] = useState()
  const [values, setValues] = useState({
    username:  "",
    password: ""
  })
  const [selectedRole,setSelectedRole] = useState('')
  const errors = {}
  const inputAttr = [
    {
      id: "username",
      name: "username",
      label: "User Name*",
      type: 'text',
      errMsg: "",
      pattern: '^[a-zA-Z0-9_]{3,26}$'
    },
    {
      name: "password",
      label: "Password*",
      type: 'password',
      required: true
    },
  ]

  async function handleSubmit(e){
    e.preventDefault()
    const data = {
      Mode:"update",
      UserName:values.username,
      Password:values.password,
      roleId:selectedRole,
      displayId:userDetails[0].displayId
    }
    console.log(data)
    try{
      await api.post('admin/upsetuser',data)
    }
    catch(err){
      console.log(err.message)
    }
  }

  useEffect(() => {
    async function getUserById() {
      try {
        const response = await  api.get(`/admin/getuser?displayId=${id}`)
        setUserDetails(response.data.responsedata)
        setSelectedRole(response.data.responsedata[0].roleId)
        setValues({
          username: response.data.responsedata[0].userName || "",
          password: response.data.responsedata[0].password || ""
        })
      }
      catch (err) {
        console.log(err.message)
      }
    }
    getUserById()
  }, [id])

  useEffect(()=>{
    async function getAllRoles(){
      const rolesMap = new Map()
      try{
        const response = await api.get('/admin/Roles')
        response.data.responsedata.forEach((data)=>{
          rolesMap.set(data.recordId,data.role)
        })

        setRolesdrpdwn(Array.from(rolesMap))
      }
      catch(err){
        console.log(err.message)
      }
    }
    getAllRoles()
  },[])
  return (
    <div className='edit-profile'>
      <SecondaryHeader
        title={"Edit User"}
      />
      <form className='my-form' onSubmit={handleSubmit} style={{ marginTop: "70px" ,padding:"0px 10px 0px 10px"}}>
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
        <div className='drpdwn-wrap'>
        <label>Role*</label>
        <FormDropDown
          selectedOption={selectedRole}
          setSelectedOption={setSelectedRole}
          dropdownMap={rolesdrpdwn}
          disabled={selectedRole} 
        />
        </div>
        <button className='update-profile-btn' type='submit'>
          Update User
        </button>
      </form>
    </div>
  )
}

export default EditUsers
