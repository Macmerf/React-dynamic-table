import React, {FC} from 'react'
import { IUser,} from '../types/types'

interface UserRowrops{
  user:IUser
}

const UserRow:FC<UserRowrops>  = ({user}) =>{
  return (
    <tr>
    {user ? Object.values(user).map((userValue, index) => {
      return index !== 0 ? 
      <td key={index + Math.random() ^ 3}>
        {userValue}
      </td> 
      : 
      undefined
    }) 
    : 
    <></>}
  </tr>
  )
}


export default UserRow

