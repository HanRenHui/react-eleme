import React, { memo } from 'react'

import './header.scss'
interface IProps {
  title: any,
  cb?: any,
}
const Header = (props: IProps) => {
  const { title, cb } = props
  return (
    <header className='header container'>
      <i className="header-left iconfont icon-zuojiantou" onClick={cb}></i>
      <div className="header-center" >{title}</div>
    </header>
  )
}

export default memo(Header)