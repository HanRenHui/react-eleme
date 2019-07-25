import React, { memo, useEffect, useState } from 'react'
import { getImgPath } from './../../../../util/getImgPath'
import BuyCount from './../../../../Components/BuyCount'
import './detailUp.scss'
import { fromJS } from 'immutable';
interface IProps {
  setShowFoodDetail: Function,
  detailFood: any,
}
const DetailUp = memo((props: IProps) => {
  const { setShowFoodDetail, detailFood } = props
  const [currentPrice, setCurrent] = useState(0)
  const [originPrice, setOrigin] = useState(0)
  useEffect(() => {
    if (Object.keys(detailFood).length) {
      setCurrent(detailFood.specfoods[0].price)
      setOrigin(detailFood.specfoods[0].original_price)
    }

  }, [detailFood])
  return (
    <div className="detail-up">
      <header>
        <i className="iconfont icon-shanchuguanbicha2" onClick={() => setShowFoodDetail(false)}></i>
      </header>
      <img src={getImgPath(detailFood.image_path || '', 6)} className="img_detail" alt="" />
      <h3>{detailFood.name}</h3>
      <p className="up-info">
        <span>月售{detailFood.month_sales}份</span>
        <span>好评率{detailFood.satisfy_rate}%</span>
      </p>
      <div className="up-buy">
        <span className='current'>￥{currentPrice}</span>
        {
          originPrice
            ? (
              <>
                <span className="origin">￥{originPrice}</span>
                <span className="discount">{(((currentPrice / originPrice) as any) * 10).toFixed(1)}折</span>

              </>
            )
            : null
        }
      </div>
      <p className="up-des">{detailFood.description}</p>
    </div>
  )
})
export default DetailUp

