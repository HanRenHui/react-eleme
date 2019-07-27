import React, { useEffect, useState, useMemo } from 'react'
import './myaddress.scss'
import Header from './../../Components/Header'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/userAction'
import { Modal } from 'antd-mobile'
import AddAdress from './../AddAdress'
const alert = Modal.alert
interface IProps {
  history: any,
  req_address: Function,
  addressList: any,
  userId: string,
  del_address: Function
}
const MyAddress = (props: IProps) => {
  const { history, req_address, addressList, userId, del_address } = props
  // 控制编辑页的显示与隐藏
  const [EditAdd, setEditAdd] = useState({})
  useEffect(() => {
    if (userId) {
      req_address(userId)
    }
  }, [userId, EditAdd])
  const handleDel = (id: string) => {
    alert('删除地址', '确认删除地址', [
      { text: '取消' },
      { text: '确定', onPress: () => del_address(userId, id) },
    ])

  }
  const addressData = useMemo(() => EditAdd, [EditAdd])
  return (
    <div className="myaddress">
      <Header title="我的地址" cb={() => history.goBack()} />
      <ul className="myaddress-list">
        {addressList && addressList.map((address: any) => {
          const tag = address.get('tag')
          let color
          if (tag === '家') {
            color = 'orange'
          } else if (tag === '公司') {
            color = 'blue'
          }
          return (
            <li className="myaddress-item" key={address.get('_id')}>
              <div className="myaddress-up">
                <span className='myaddress-item-name'>{address.get('name')}</span>
                <span className='myaddress-item-sex'>{address.get('sex') ? '先生' : '女士'}</span>
                <span className='myaddress-item-phone'>{address.get('phone')}</span>
              </div>
              <div className="myaddress-down">
                <span className={`myaddress-item-tag ${color}`}>{address.get('tag')}</span>
                <p className="myaddress-item-detail">
                  {address.get('address')}{address.get('address_detail')}{address.get('')}
                </p>
              </div>
              <i className="iconfont edit icon-bianji" onClick={() => setEditAdd(address.toJS())}></i>
              <i className="iconfont cha icon-cuohao" onClick={() => handleDel(address.get('_id'))}></i>
            </li>
          )
        })}
      </ul>
      {
        Object.keys(EditAdd).length
          ? <AddAdress
            history={history}
            backCb={() => setEditAdd({})}
            address={addressData}
            Title="编辑地址"
            EditAdd={EditAdd}
          />
          : null
      }
      <div className="myaddress-add">
        <i className="iconfont icon-jiahao"></i>
        <span onClick={() => history.push('/addaddress')}>新增收货地址</span>
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  addressList: state.getIn(['user', 'address']),
  userId: state.getIn(['user', 'userinfo', '_id']),

})

export default connect(mapStateToProps, actions)(MyAddress)