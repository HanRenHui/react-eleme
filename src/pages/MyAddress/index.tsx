import React from 'react'
import './myaddress.scss'
import Header from './../../Components/Header'
interface IProps {
  history: any
}
const MyAddress = (props: IProps) => {
  const { history } = props 
  return (
    <div className="myaddress">
      <Header title="我的地址" cb={() => history.goBack()}/>
      <div className="myaddress-add">
        <i className="iconfont icon-jiahao"></i>
        <span>新增收货地址</span>
      </div>
    </div>
  )
}

export default MyAddress