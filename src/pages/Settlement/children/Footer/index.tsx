import React, { memo } from 'react'
import './footer.scss'
import { Toast } from 'antd-mobile'
interface IProps {
  currentTotal: number, 
  discount: number,
  address: string,
  history: any
}
const Footer = memo((props: IProps) => {
  const { currentTotal, discount, address, history } =props 
  const handlePay = () => {
    if (!address) {
      return Toast.fail('请选择收货地址', 1);
    }
    history.push('/pay')
  }
  return (
    <footer className="settlement-bottom">
      <div className="settlement-bottom-price">
        <p>
          <span className="price-current">￥{currentTotal}</span>
          {
            discount
              ? <span className="price-origin">| 已优惠￥{discount.toFixed(1)}</span>
              : null
          }
        </p>
      </div>
      <div className="settlement-bottom-button" onClick={handlePay}>去支付</div>
    </footer>
  )
})
export default Footer