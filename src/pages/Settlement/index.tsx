import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import "./settlemenet.scss"
import { Link } from 'react-router-dom'
import Header from './../../Components/Header'
import * as actions from './../../store/actions/settlementAction'
import Footer from './children/Footer'
import FoodsItem from './children/FoodsItem'
import CartItem from './children/CartItem'
import Store from './../../store'
import { get_RemarkInfo } from './../../store/actions/RemarkActions'
interface IProps {
  order_lead_time: number,
  history: any,
  buycar: any,
  shopName: string,
  fee: string,
  set_flag: Function,
  address: any,
  singleData: any,
  mutiData: any,
  markText: string,
  remarkInfo: string
}
const Settlement = (props: IProps) => {
  const {
    history,
    buycar,
    shopName,
    fee,
    set_flag,
    address,
    order_lead_time,
    remarkInfo
  } = props
  const [currentTotal, setcurrentTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [time, setTime] = useState('')
  useEffect(() => {
    set_flag(false)
  }, [])
  // 计算总价
  useEffect(() => {
    let totalCur = 0
    let discount = 0
    buycar.forEach((food: any) => {
      let origin = food.getIn(['specfoods', '0', 'original_price'])
      let cur = food.getIn(['specfoods', '0', 'price'])
      totalCur += cur * food.get('count')
      if (cur && origin) {
        discount += origin - cur
      }
    })
    setcurrentTotal(totalCur)
    setDiscount(discount)
  }, [buycar])
  // 送达时间
  useEffect(() => {
    let date = new Date()
    date.setMinutes(date.getMinutes() + order_lead_time)
    let min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
    let now = date.getHours() + ':' + min
    setTime(now)
  }, [order_lead_time])
  // 获取备注信息
  useEffect(() => {
    Store.dispatch(get_RemarkInfo())
  }, [])
  return (
    <div className="settlement">
      <Header title="确认订单" cb={() => history.goBack()} />
      <div className="settlement-wrapper">

        <section className="settelment-address">
          <p className="settelment-address-title">
            订单配送至
            {
              address && address.get('tag')
                ? <span className="settelment-address-title-tag">{address.get('tag')}</span>
                : null
            }
          </p>
          <p className="settelment-address-select" onClick={() => set_flag(true)}>
            <Link to="/myaddress" className="settelment-address-link">
              {
                address && address.get('address')
                  ? address.get('address') + address.get('address_detail')
                  : '选择收货地址'
              }
            </Link>
            <i className="iconfont icon-youjiantou"></i>
          </p>
          {
            address && address.get('name')
              ? (
                <p className="settelment-address-person">
                  <span className="person-name">{address.get('name')}({address.get('sex') ? '先生' : '女士'})</span>
                  <span className="person-phone">{address.get('phone')}</span>
                </p>
              )
              : null
          }

          <div className="settlement-address-run">
            <p className="settlement-address-run-time">
              <span className="settlement-address-run-time-left">
                送达时间
                <span className="fengniao">蜂鸟专送</span>
              </span>
              <span className="settlement-address-run-time-right">
                尽快送达({time})<i className="iconfont icon-youjiantou"></i>
              </span>
            </p>
            <p className="settlement-address-run-payway">
              <span className="settlement-address-run-payway-left">
                支付方式
              </span>
              <span className="settlement-address-run-payway-right">
                在线支付
              </span>
            </p>
          </div>
        </section>
        {/* 商品清单 */}
        <section className="settlement-foods">
          <div className="settlement-foods-wrapper">
            <h3 className="settlement-foods-title">{shopName}</h3>
            <ul className="settlement-foods-list">
              {buycar && buycar.map((food: any) => (
                <FoodsItem food={food} key={food.get('item_id')} />
              ))}
              <li className="fee">
                <span className="fee-left">
                  <span className="fee-left-tag">商家</span>
                  配送费
              </span>
                <span className="fee-right">
                  ￥{fee}
                </span>
              </li>
              <li className="tips">
                满减活动与折扣商品不同享
            </li>
              <li className="total">
                <span className="total-left">优惠说明<i className="iconfont icon-wenhao"></i></span>
                <span className="total-right">小计<span className="total-right-price">￥{currentTotal}</span></span>
              </li>
            </ul>
          </div>

        </section>
        <section className="settlement-cart">
          {/* <CartItem title="餐具分数" subtitle="未选择" /> */}
          <CartItem title={remarkInfo || '备注信息'} subtitle="口味、偏好" flag={true} cb={() => history.push('/remark')} />
          <CartItem title="发票信息" subtitle="不需要开发票" />
        </section>
      </div>
      <Footer
        discount={discount}
        currentTotal={currentTotal}
        address={address.get('address')}
        history={history}
      />
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  buycar: state.getIn(['settlement', 'buycar']),
  shopName: state.getIn(['detail', 'rst', 'name']),
  fee: state.getIn(['detail', 'rst', 'piecewise_agent_fee', 'rules', '0', 'fee']),
  address: state.getIn(['settlement', 'address']),
  order_lead_time: state.getIn(['detail', 'rst', 'order_lead_time']),
  remarkInfo: state.getIn(['remark', 'remarkInfo']),
})

export default connect(mapStateToProps, actions)(Settlement)