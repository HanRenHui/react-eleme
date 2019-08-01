import React, { useState, useCallback, ChangeEvent } from 'react'
import Header from './../../Components/Header'
import './addadress.scss'
import { CSSTransition } from 'react-transition-group'
import Tag from './children/Tag'
import Model from './children/Model'
import { Toast } from 'antd-mobile'
import * as actions from './../../store/actions/userAction'
import { connect } from 'react-redux'

interface IProps {
  history: any,
  userId: string,
  incre_address: Function,
  backCb?: Function,
  Title?: string,
  EditAdd: any,
  address: any,
  update_address: Function
}
const AddAdress = (props: IProps) => {
  let {
    history,
    userId,
    incre_address,
    backCb,
    Title,
    address,
    update_address
  } = props
  address = address ? address : {}
  // 记录联系人姓名
  const [name, setName] = useState(address.name)
  // 记录电话
  const [phone, setPhone] = useState(address.phone)
  // 记录门牌号
  const [num, setNum] = useState('')
  const sex = address.sex === 0 ? '女士' : '先生'
  const [sexTag, setSexTag] = useState(sex)
  const [localTag, setLocalTag] = useState(address.tag || '家')
  // 控制添加蒙版的显示与隐藏
  const [show, setShow] = useState(false)
  const [addressName, setAddressName] = useState(address.address)
  const [addressDetail, setAddressDetail] = useState(address.address_detail)
  const setSelect = useCallback(( address: string, name: string) => {

    setAddressDetail(address)
    setAddressName(name)
  }, [])
  const add = async () => {
    if (!name || !phone || !sexTag || !localTag)
      return Toast.fail('请将信息填写完整', 1);
    let newAddress = {
      address: addressName,
      address_detail: addressDetail + num,
      name,
      phone,
      sex: sexTag === '先生' ? 1 : 0,
      tag: localTag,
    }
    if (!Object.keys(address).length) {
      // 添加地址
      incre_address(userId, newAddress)
      history.push('/myaddress')
    } else {
      //修改地址
      update_address(userId, (address as any)._id, newAddress)
      backCb && backCb()
    }

  }
  const goback = backCb ? backCb : history.goBack
  const title = Title ? Title : '添加地址'
  const addressNumber = Object.keys(address).length ? addressDetail : num
  const handleNumChange = (value: string) => {
    if (Object.keys(address).length) {
      setAddressDetail(value)
    } else {
      setNum(value)
    }
  }
  return (
    <div className="add_address">
      <Header title={title} cb={() => goback()}></Header>
      {/* 联系人 */}
      <div className="address people">
        <span className="address-people-left">联系人</span>
        <div className="address-right address-people-right">
          <div className="address-people-right-up">
            <input type="text" placeholder="姓名" value={name || ''} onChange={(e: any) => setName(e.target.value)} />
          </div>
          <div className="address-people-right-down">
            <Tag tags={['先生', '女士']} tag={sexTag} setTag={setSexTag} />
          </div>
        </div>
      </div>
      <div className="address phone">
        <span className="address-phone-left ">电话</span>
        <div className="address-phone-right address-right">
          <input type="text" placeholder="手机号码" value={phone || ''} onChange={(e: any) => setPhone(e.target.value)} />
        </div>
      </div>
      <div className="address location">
        <span className="address-location-left">地址</span>
        <div className="address-location-right address-right" onClick={() => setShow(true)}>
          <input className="location-input" readOnly placeholder="小区/写字楼/学校等" value={addressName || ''} />
          {
            Object.keys(address).length > 0
              ? null
              : <p>{addressDetail}</p>
          }

          <i className="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <div className="address number">
        <span className="address-number-left">门牌号</span>
        <div className="address-number-right address-right">
          <textarea
            maxLength={100}
            rows={2}
            placeholder="10号楼5层501室222"
            value={addressNumber}
            onChange={(e: any) => handleNumChange(e.target.value)}
          ></textarea>
          <i className="iconfont icon-bianji"></i>
        </div>
      </div>
      <div className="address tags">
        <span className="address-tags-left">标签</span>
        <div className="address-tags-right address-right">
          <Tag tags={['家', '学校', '公司']} tag={localTag} setTag={setLocalTag} />
        </div>
      </div>
      <button className="address-btn" onClick={add}>确定</button>
      {/* 添加地址面板 */}
      <CSSTransition timeout={200} classNames="showAdd" in={show}>
        <Model setShow={setShow} setAddress={setSelect} />
      </CSSTransition>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  userId: state.getIn(['user', 'userinfo', '_id'])
})
export default connect(mapStateToProps, actions)(AddAdress)