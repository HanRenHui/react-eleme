import React, { memo } from 'react'
import './inputitem.scss'
interface IProps {
  placeholder: string,
  hasButton: boolean,
  isBtnUseful?: boolean,
  data: string,
  cb: any
}

const InputItem = memo((props: IProps) => {
  const {
    placeholder,
    hasButton,
    isBtnUseful,
    data,
    cb
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
        ? <button className={` ${isBtnUseful ? 'useful' : ''}`}>获取验证码</button>
        : null
      }
    </div>
  )
})

export default InputItem 