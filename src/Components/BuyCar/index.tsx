import React, { memo, useEffect, useState } from 'react'
import CarContro from './CarContro'
import { CSSTransition } from 'react-transition-group'
import './car.scss'
interface IProps {
  foodCar: any,
  totalCount: number,
  currentTotal: number,
  originTotal: number,
  fee: number,
  price: number
}

const BuyCar = memo((props: IProps) => {
  const [showMask, seShowMask] = useState(false)

  // const { fee, price, menu, recommend, seShowMask, showMask } = props
  const {
    foodCar,
    totalCount,
    currentTotal,
    originTotal,
    fee,
    price,
  } = props
  // 计算起送差价
  let moneyShow
  if (currentTotal === 0) {
    moneyShow = `￥${price}起送`
  } else if (currentTotal < price) {
    // 乘100 解决精度问题
    moneyShow = `还差￥${(price * 1000 - currentTotal * 1000) / 1000}起送`
  } else {
    moneyShow = '去结算'
  }


  // 监听购物车的点击
  const handleClick = () => {
    if (!foodCar.length) return
    seShowMask(true)
  }

  return (
    <div className="buy-car-wrapper">
      <CSSTransition in={showMask} timeout={300} classNames="buycar">
        <CarContro foodCar={foodCar} seShowMask={seShowMask}/>
      </CSSTransition>
      <div className="buy-car" onClick={handleClick}>
        <span className={`buy-car-icon ${foodCar.length ? 'car-useful' : ''}`}>
          <i className="iconfont icon-gouwuche"></i>
          {
            totalCount
              ? <span className="buy-mark">{totalCount}</span>
              : null
          }
        </span>
        <div className="buy-car-center">
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


export default BuyCar