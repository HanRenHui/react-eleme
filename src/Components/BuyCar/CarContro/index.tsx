import React, { memo, useEffect, useRef } from 'react'
import BuyCount from '../../BuyCount'
import { fromJS } from 'immutable'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import * as actions from './../../../store/actions/detailAction'
import './carcontro.scss'
interface IProps {
  foodCar: any,
  seShowMask: Function,
  clear_select: Function
}
const CarContro = memo((props: IProps) => {
  const { foodCar, seShowMask, clear_select } = props
  const foodRef = useRef({})
  useEffect(() => {
    if (!Object.keys(foodRef.current).length) {
      foodRef.current = new BScroll('.car-contro-foods-wrapper', {
        click: true
      })
    }
  }, [foodCar])
  const handleClear = () => {
    seShowMask(false)
    clear_select()
  }
  return (
    <div className="car-contro">
      {/* 头部 */}
      <header className="car-contro-header">
        <div className="car-contro-header-left">
          已选商品
        </div>
        <div className="car-contro-header-right" onClick={handleClear}>
          <i className="iconfont icon-lajilou"></i>
          <span>清空</span>
        </div>
      </header>
      {/* 选中的商品 */}
      <div className="car-contro-foods-wrapper">
        <ul className="car-contro-foods">
          {foodCar && foodCar.map(((food: any) => (
            <li key={food.item_id}>
              <p className="car-contro-foods-name">{food.name}</p>
              <p className="car-contro-foods-price">
                <span className="price-current">￥{food.specfoods[0].price}</span>
                {
                  food.specfoods[0].original_price
                    ? <span className="price-origin">￥{food.specfoods[0].original_price}</span>
                    : null
                }
              </p>
              <BuyCount food={fromJS(food)} flag={1} />
            </li>
          )))}
        </ul>
      </div>

    </div>
  )
})

export default connect(null, actions)(CarContro)