import React, {FC} from 'react'
import { IUser,} from '../types/types'

interface UserRowrops{
  user:IUser
}

const UserRow:FC<UserRowrops>  = ({user}) =>{
  return (
    <tr key={user.id}>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.birthday}</td>
    <td>{user.phone}</td>
    <td>{user.email}</td>
    <td>{user.card_type}</td>
  </tr>
  )
}


export default UserRow

