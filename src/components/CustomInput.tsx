import React, { FC, useEffect, } from 'react'

interface InputProps {
  labelName: string,
  index: number,
  LoadUserKeyList(type: string): void,
  value: number | string,
  updateUser(event: React.ChangeEvent<HTMLInputElement>, type: string): void,
}
const CustomInput: FC<InputProps> = ({ index, labelName, LoadUserKeyList, updateUser, ...atrs }) => {

  useEffect(() => {
    LoadUserKeyList(labelName);
    // eslint-disable-next-line
  }, [])

  return (
    index !== 0 ?
      <div className="input-group my-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="">{labelName.replaceAll('_', ' ')}</span>
        </div>
        <input required onChange={event => updateUser(event, labelName)} type="text" className="form-control" {...atrs} />
      </div>
      :
      <></>
  )
}

export default CustomInput