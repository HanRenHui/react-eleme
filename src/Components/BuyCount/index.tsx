import React, { memo } from 'react'
import './buycount.scss'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/detailAction'
interface IProps {
  food: any,
  incre_select: Function,
  decre_select: Function,
  flag?: number
  // count: number 
}
const BuyCount = memo((props: IProps) => {
  const { food, incre_select, decre_select, flag } = props
  const decrement = (e: any) => {
      decre_select(food.get('item_id'))
  }
  const increment = (e: any) => {
      incre_select(food.get('item_id'))
  }
  return (
    <div className='buycount'>
      {
        flag
          ? (
            <i
              className="iconfont icon-jianhao icon-left icon-left-car"
              onClick={(e) => decrement(e)}
            ></i>
          )
          : (
            <CSSTransition classNames='fade3' timeout={400} in={food.get('count') > 0}>
              <i
                className="iconfont icon-jianhao icon-left"
                onClick={(e) => decrement(e)}
              ></i>
            </CSSTransition>
          )
      }

      {
        food.get('count')
          ? <span>{food.get('count')}</span>
          : null
      }
      <i className="iconfont icon-jia icon" onClick={(e) => increment(e)}></i>
    </div>
  )
})

export default connect(null, actions)(BuyCount)