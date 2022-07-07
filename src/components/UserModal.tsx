import React, { FC } from 'react'
import { Col } from 'react-bootstrap'
import { IUser } from '../types/types'

interface ModalProps {
  users: IUser[]
}

const UserModal: FC<ModalProps> = ({ users }) => {
  return (
    <div className='modal-wrapper'>
      <div className="modal-window">
        {users[0] ? Object.keys(users[0]).map((headerName, index) => {
          return (<Col sx={12} key={headerName}><input></input></Col>)
        })
          :
          undefined}
      </div>
    </div>
  )
}

export default UserModal