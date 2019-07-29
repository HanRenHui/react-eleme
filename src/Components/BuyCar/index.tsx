import React, { memo, useEffect, useState } from 'react'
import CarContro from './CarContro'
import { CSSTransition } from 'react-transition-group'
import * as actions from './../../store/actions/settlementAction'
import { connect } from "react-redux"
import './car.scss'
interface IProps {
  foodCar: any,
  totalCount: number,
  currentTotal: number,
  originTotal: number,
  fee: number,
  price: number,
  set_buy_car: Function,
  history: any
}

const BuyCar = memo((props: IProps) => {
  const [showMask, seShowMask] = useState(false)

  const {
    foodCar,
    totalCount,
    currentTotal,
    originTotal,
    fee,
    price,
    set_buy_car,
    history
  } = props
  // 去结算
  const handlePay = () => {
    set_buy_car(foodCar)
    // 将购物车中的数据存储到store中
    history.push('/settlement')
  }
  
  // 监听购物车的点击
  const handleClick = () => {
    if (!foodCar.length) return
    seShowMask(true)
  }
  // 计算起送差价
  let moneyShow
  if (currentTotal === 0) {
    moneyShow = <span onClick={handleClick}>￥{price}起送</span>
  } else if (currentTotal < price) {
    // 乘100 解决精度问题
    moneyShow = <span  onClick={handleClick}>还差￥{(price * 1000 - currentTotal * 1000) / 1000}起送</span>
  } else {
    // moneyShow = ''
    moneyShow = <span className="car-pay" onClick={() => handlePay()}>去结算</span>
  }



  return (
    <div className="buy-car-wrapper">
      <CSSTransition in={showMask} timeout={300} classNames="buycar">
        <CarContro foodCar={foodCar} seShowMask={seShowMask}/>
      </CSSTransition>
      <div className="buy-car">
        <span className={`buy-car-icon ${foodCar.length ? 'car-useful' : ''}`} onClick={handleClick}>
          <i className="iconfont icon-gouwuche"></i>
          {
            totalCount
              ? <span className="buy-mark">{totalCount}</span>
              : null
          }
        </span>
        <div className="buy-car-center" onClick={handleClick}>
          {
            foodCar.length > 0
              ? (
                <p className="buy-car-center-money">
                  <span className="buy-car-center-money-current">￥{currentTotal}</span>
                  {
                    originTotal > 0
                      ? <span className="buy-car-center-money-origin">￥{originTotal}</span>
                      : null
                  }
                </p>
              )
              : <p>未选购商品</p>
          }
          <span>另需配送费{fee}元</span>
        </div>
        <div className={`buy-car-right ${currentTotal >= price ? 'btn-useful' : ''}`}>
          {moneyShow}
        </div>
      </div>
      {/* 黑色蒙版 */}
      {
        showMask
          ? <div className="mask" onClick={() => seShowMask(false)}></div>
          : null
      }

    </div>


  )
})


export default connect(null, actions)(BuyCar)