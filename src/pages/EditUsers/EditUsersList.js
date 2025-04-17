import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import UserList from './UserList'
import SearchHeader from '../../components/searchHeader/SearchHeader'
import { useParams } from 'react-router-dom'

const EditUsersList = () => {
    const [userList, setUserList] = useState([])
    const [search, setSearch] = useState("")
    const [counterRefresh , setCounterRefresh] = useState(false)
    const {id} = useParams()

    function filterUsers() {
        return userList.filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()) || user.role.toLowerCase().includes(search.toLowerCase()))
    }

    useEffect(() => {
        async function GetAllUsers() {
            try {
                const response = await api.get(`/admin/userlist?role=${parseInt(id)}`)
                console.log(response.data.responsedata)
                setUserList(response.data.responsedata)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        GetAllUsers()
    }, [counterRefresh,id])

    return (
        <section>
            <SearchHeader
                title={"Search Users"}
                viewType={true}
                search={search}
                setSearch={setSearch}
                viewbtn={false}
            />
            <div style={{margin:"70px 0px 70px 0px"}}>
                {
                    userList &&
                    filterUsers().map((user, index) => (
                        <UserList
                            key={index}
                            user={user}
                            counterRefresh={counterRefresh}
                            setCounterRefresh={setCounterRefresh}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default EditUsersList
