import React, { memo } from 'react'
import "./cartitem.scss"
interface IProps {
  title: string,
  subtitle: string,
  cb?: Function,
  flag?: boolean
}

const CartItem = memo((props: IProps) => {
  const { title, subtitle, cb, flag } = props
  return (
    <p className="settlement-cart-item" onClick={() => cb && cb()}>
      <span className={`settlement-cart-item-left ${flag ? 'remark' : ''}`}>{title} </span>
      <span className="settlement-cart-item-right">
        {
          title == '备注信息' || !flag
          ? subtitle
          : ''
        }
        <i className="iconfont icon-youjiantou"></i>
        </span>
    </p>
  )
})

export default CartItem
