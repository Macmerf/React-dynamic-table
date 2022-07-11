import React, { FC } from 'react'
import { IUser } from '../types/types'

interface UserHeaderProps{
  users:IUser[]
}

const UserHeader :FC<UserHeaderProps> = ({users}) => {
  return (
    <tr>
    {users[0] ? Object.keys(users[0]).map((headerName, index) => {
      return index !== 0 ? 
      <th key={index + Math.random() ^ 3}>
        {headerName.replaceAll('_', ' ')}
      </th> 
      : 
      undefined
    }) 
    : 
    <></>}
  </tr>
  )
}

export default UserHeader