import React, { FC } from 'react'
import { IUser } from '../types/types'

interface UserHeaderProps{
  users:IUser[]
}

const UserHeader :FC<UserHeaderProps> = ({users}) => {
  return (
    <tr>
    {users[0] ? Object.keys(users[0]).map((headerName, index) => {
      return <th key={index}>{headerName}</th>
    }) : undefined}
  </tr>
  )
}

export default UserHeader