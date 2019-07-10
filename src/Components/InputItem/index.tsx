import React, { memo } from 'react'
import './inputitem.scss'
interface IProps {
  placeholder: string,
  hasButton: boolean,
  isBtnUseful?: boolean,
  data: string,
  cb: any,
  BtnCb?: any,
  BtnMsg?: any
}

const InputItem = memo((props: IProps) => {
  const {
    placeholder,
    hasButton,
    isBtnUseful,
    data,
    cb,
    BtnCb,
    BtnMsg
  } = props

  return (
    <div className="inputWrapper">
      <input
        type="text"
        placeholder={placeholder}
        value={data}
        onChange={cb}
        
      />
      {hasButton
        ? <button onClick={BtnCb} className={` ${isBtnUseful ? 'useful' : ''}`}>{BtnMsg}</button>
        : null
      }
    </div>
  )
})

export default InputItem 