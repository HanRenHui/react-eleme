import React, { useEffect, useState, useMemo } from 'react'
import './myaddress.scss'
import Header from './../../Components/Header'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/userAction'
import { Modal } from 'antd-mobile'
import AddAdress from './../AddAdress'
const alert = Modal.alert
interface IProps {
  isSelectAddress: boolean,
  history: any,
  req_address: Function,
  addressList: any,
  userId: string,
  del_address: Function,
  set_select_address: any,
  SelectAddress: any
}
const MyAddress = (props: IProps) => {
  const {
    history,
    req_address,
    addressList,
    userId,
    del_address,
    set_select_address,
    isSelectAddress,
    SelectAddress
  } = props
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
  const handleSelect = (address: any) => {
    if (!isSelectAddress) return
    set_select_address(address)
    history.goBack()

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
          // console.log( address.get('_id'))
          return (
            <li className="myaddress-item" key={address.get('_id')}>
              {
                isSelectAddress
                  ? (
                    <section className="myaddress-item-left">
                      {
                        SelectAddress.get('_id') === address.get('_id')
                          ? (
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABVhJREFUWAm9mV1oXFUQgGfO3aQJBgMFIyRSkWQTf0p9SF4UrFRpEUk2rRAriqQPzaYNDVLbJx/MKogKLYqUkJ+C+lCxJDTJRqtthbZ5Emn1pRbsbixEkthSsdFg1mTvGWeuucvN2d27N+kmF8K558ycOV/mzpnzswhrfHYnorVpoFYkaiSAaiCsRi4JoQSA/kLA22z6OiBctQCHR8MDk2sZim0Gf/YkD1SldfoQA+0Bgq3BewJzwhUE9eUm/htq6JsO2jcQYNvtroqFucUjqPEoAVUENZ5TDyGlSH24ubT6g88eiaVy6ngaCwJGbnS+RGD3EsGDnn73/IqIk6Cge7xu8Bs/YyqfkIiwObG/R4M9XGw4GZPt15JNZ1sS+4/lY5D2nB5s++1weWph/nM20ubXuWgyhYNNdTUHYhjTps0sD4rnNhROiDR1XElMn4pRLGQCZjW0JDve5hm6MZ7z0HC6Sv8Mj3OCWPms8KBMCIbrWamy/jVEGGisf6h9CF+2zdEyMSipJHV3MbkeE8Ic1FtHVB+P1w8c9rZ53zMelDy38XDwnh+cgDoedFYI25685yTs/dcLvCvAt+INg++bavtuxsruLE2fVmWbDsa3nJhxPGhru3vD4JBXbVRv5IJ7/fej9/2xOH2Wk2SEUqkugXcANdBu8z9ZjzqvHprhovxZPzHtv5bovv/Pubnz7KgdIiPAfZLy0NmVaJ00OxS/jmkGbGe4L0zbvDBsTv3z9znOMU1eWciCppBsmbyN6/HOgb7In+qVsfqBEdO+xD/DXWC4baZM27hLyX7OFBSzzl5bQMtqHWsYzIKLTB2qXtLpS7nghIE/95OKhdWBgRDP8YBzQfV50zpvofVivK7/W7NPy2R0C6X+nWCKx0xZpo64VclOONPg88JgQ03hmmaLrF1BIHl1uAuKdo6G+y6ZZiXuKa0nZEdjyoz6A4rjoyCgwDWGa17l3UZ6tKHvh0KQ7Lk7iKHnxsMnvzcGhJab0UdtrSe4/WFTZtb561Zy7PL64fPwYBddOFfND5L1Z5VSz8bDfT+5+m4Z+fXgNliiy0HDiufHIscgzroGcpWE9NSPiVknN3nluSDZ01NolWwfC/df9+rKe2Sys0kvLV3kz1plyvLVhY1XHJrJp+C0E5TxrjrOO52dpp4XkmMuCRY+E6/rzcqprcmOp8nW33H/zaYN3zqzSQz6A4qFQpCKni8pVdvHawemzAEjyegO26bz7LlKU1aoLmx87uh4k3e0xwspO3I5kYEVidf3XwiiH0l2vkBan2G48iD6WToKj6gQ4FiWIF+DjyfNLnwYaiXbHlszHBsUNuWc+BGumQPkrQeAbE527iWNwzxbS/PaKSRgJmHjNONsCrOWId/+PpCRX6LtqO1THLhZ5x1fm4aQ489hcgBDKnRCliVDx7+aA7LlRrRTo/6UM6vl39lfKizCJFoM+v8jh3TQEHPrgcvliUNoP0EaPgrcz09RQeyr8Ml3RMXxoLyUV5Ye51x2S95X9bAnifTXxYITBmFxGTKAQ1W98whWF/vUd+lzO3pL3hbxlVsRHjkOMIOwuNYygNLA+e0MAzqudRU2tOSxHQbPoJkYdNs4b2EkET3N5YbeLsiOKR4e2Mvlii+4woMCKQpl5RXt0sGFXu9SxloecwWcw5NvcPHk8j1ND0dllqfz9VtVu8Q7f1a+I3zX9Jxrp+DA63eBCbdkQpgx54K5ZUFAUSzmFbAkYVJ0TFKJd7a6QGYZCNDtJEdEuYVwDvqrvETnT3mNBxuRFWKkrk9+AQj0rArQazHfzxCiw5E+IxthNj7DdwNXZVey1p8h/gM30j51BxSfeAAAAABJRU5ErkJggg==" />
                          )
                          : null
                      }
                    </section>
                  ) : null

              }
              <section className="myaddress-item-right" onClick={() => handleSelect(address)}>
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
              </section>

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
  isSelectAddress: state.getIn(['settlement', 'flag']),
  SelectAddress: state.getIn(['settlement', 'address']),

})

export default connect(mapStateToProps, actions)(MyAddress)