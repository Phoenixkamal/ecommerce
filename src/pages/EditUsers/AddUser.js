import React, { useEffect, useState } from 'react'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'
import FormInput from '../../components/forminput/FormInput'
import FormDropDown from '../../components/dropdown/FormDropDown'
import api from '../../api/api'
import { useParams } from 'react-router-dom'

const AddUser = () => {
  const {id} = useParams()
    const [values , setValues] = useState({
        username:"",
        password:"",
        email:"",
        phone:"",
    })
    const rolesMap = new Map()
    const [rolesdrpdwn,setRolesdrpdwn] = useState()
    const [selectedRole,setSelectedRole] = useState(id)
    const [gender , setGender] = useState('')
    // gender:"",
    // customertype:""
    // mode
    const errors = {}

    const inputAttr = [
        {
            id: "username",
            name: "username",
            label: "User Name*",
            type: 'text',
            errMsg: "",
            pattern: '^[a-zA-Z0-9_]{3,26}$',
            required:true
          },
        {
            id: "password",
            name: "password",
            label: "Password*",
            type: 'password',
            required:true
          },
          {
            id: "email",
            name: "email",
            label: "Email*",
            type: 'email',
            errMsg: "",
            required:true,
          },
          {
            id: "phone",
            name: "phone",
            label: "Phone*",
            type: 'number',
            errMsg: "",
            required:true,
          }
    ]

   async function handleSubmit(e){
        e.preventDefault()
        const data = {
            Mode:"addnew",
            username:values.username,
            password:values.password,
            email:values.email,
            phoneno:values.phone,
            roleid:selectedRole,
            gender:gender
        }

        try{
            await api.post('/admin/upsetuser',data)
        }
        catch(err){
            console.log(err.message)
        }
        console.log(data)
    }

    useEffect(() => {
      async function getAllRoles() {
        try {
          const response = await api.get('/admin/Roles');
    
          response.data.responsedata.forEach((data) => { // ✅ Use forEach()
            rolesMap.set(data.recordId, data.role);
          });
    
          setRolesdrpdwn(Array.from(rolesMap));
        } catch (err) {
          console.log(err.message);
        }
      }
      getAllRoles();
    }, [rolesMap]);
    

      function handleChange(e){
        setGender(e.target.value)
      }
  return (
    <div>
      <SecondaryHeader
        title={'Add User'}
      />
        <form className='my-form' onSubmit={handleSubmit} style={{ margin: "70px 0px 70px 0px",padding:"0px 10px 0px 10px" }}>
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
        <div className='mt-4 default-varient'>
              <label className='mr-5'>Gender</label>
              <label className="edit-custom-radio">
                <input type="radio" name="default-varient" value="Male"  onChange={handleChange} />
                <span className="edit-radio-mark"></span>
                <span className='edit-custom-radio-label'>Male</span>
              </label>
              <label className="edit-custom-radio">
                <input type="radio" name="default-varient" value="Female" onChange={handleChange} />
                <span className="edit-radio-mark"></span>
                <span className='edit-custom-radio-label'>Female</span>
              </label>
            </div>
        <button className='update-profile-btn' type='submit'>
          Add User
        </button>
      </form>
    </div>
  )
}

export default AddUser
