import axios from 'axios'
import React, { FC, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IUser } from '../types/types'
import CustomInput from './CustomInput'

interface ModalProps {
  users: IUser[],
  closeModal(): void,
  updateUserList(toFirstPage: boolean): void
}

const UserModal: FC<ModalProps> = ({ users, closeModal, updateUserList }) => {
  const newUser: IUser = {};
  const [disabled, setDisabled] = useState(false);
  const [succsesAdded, setAdded] = useState(false);

  const addUser = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setDisabled(true);
    setAdded(true);
    axios.post('http://localhost:3000/users', newUser)
      .then(() => {
        updateUserList(true)
      })
      .catch((error) => {
        alert(error);
      }).finally(() => {
        setDisabled(false)
        setTimeout(() => setAdded(false), 2000)
      }
      )
  }

  const LoadUserKeyList = (type: string) => {
    newUser[type] = ''
  }

  const updateUser = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    newUser[type] = event.target.value
  }

  return (
    <div className='modal-wrapper'>
      <div className="modal-window">
        <div className="modal-header">
          <h5 className="modal-title">Add User</h5>
          <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={addUser} className="modal-body">
          {users[0] ? Object.keys(users[0]).map((lableName, index) => {
            return (
              <CustomInput
                key={index + Math.random()}
                updateUser={event => updateUser(event, lableName)}
                value={newUser[lableName]}
                LoadUserKeyList={LoadUserKeyList}
                labelName={lableName}
                index={index} />)
          })
            :
            <></>}
          {succsesAdded ? <h4 className='text-success added-user'>User successfully added</h4> : <></>}
          <div className="d-flex justify-content-center ">
            <Button disabled={disabled} type='submit' size='lg'>Add</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal