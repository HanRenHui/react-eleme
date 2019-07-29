import React, { memo } from 'react'
import { withRouter } from 'react-router-dom'
import './header.scss'
interface IProps {
  title: any,
  cb?: any,
  style?: any
}
const Header = memo((props: IProps) => {
  const { title, cb, style } = props
  return (
    <header style={style} className='header container'>
      <i className="header-left iconfont icon-zuojiantou" onClick={cb}></i>
      <div className="header-center" >{title}</div>
    </header>
  )
})

export default Header 