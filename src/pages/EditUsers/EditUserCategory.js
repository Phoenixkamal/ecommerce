import React, { useEffect, useState } from 'react'
import SecondaryHeader from '../../components/secondaryheader/SecondaryHeader'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import './EditUser.css'

const EditUserCategory = () => {
    const [roles, setRoles] = useState([])
    useEffect(() => {
        async function getAllRoles() {
            try {
                const response = await api.get('/admin/Roles')
                setRoles(response.data.responsedata)
                console.log(response.data.responsedata)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        getAllRoles()
    }, [])
    return (
        <div className='edit-profile'>
            <SecondaryHeader
                title={"User Category"}
            />
            <div>
                <ul className='account-setting-list usr-category-list' style={{ marginBottom: "70px" }}>
                    {
                        roles.map((role, index) => (
                            <li className='account-setting-list-items user-category order'>
                                <div className='role-name'>
                                    {role.role} <span className='text-muted'>({role.userCount})</span>
                                </div>
                                <div className='black-btn inventory-btn'>
                                    <Link className='edit-category-btn' to={`/dashboard/edituserslist/${role.recordId}`} key={index}>
                                        View
                                    </Link>
                                </div>
                                <div className='black-btn inventory-btn'>
                                    <Link className='edit-category-btn' to={`adduser/${role.recordId}`}>
                                        Add
                                    </Link>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default EditUserCategory
