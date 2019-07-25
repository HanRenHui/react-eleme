import React, { memo, useEffect } from 'react'
import './orderrecomm.scss'
import { connect } from 'react-redux'
import { getImgPath } from '../../../../util/getImgPath'
import Swiper from 'swiper'
import BuyCount from '../../../../Components/BuyCount'
import 'swiper/dist/css/swiper.min.css'
interface IProps {
  recommend: any,
  setShowFoodDetail: Function,
  setDetailFood: Function
}
const DetailRecomm = memo((props: IProps) => {
  const { recommend, setShowFoodDetail, setDetailFood } = props
  useEffect(() => {
    if (recommend.size) {
      new Swiper('.swiper-container2', {
        autoplay: false,
        // loop: true
      });
    }

  }, [recommend])
  return (

    <div className="order-recomm">
      <h3>商家推荐</h3>
      <div className="swiper-container2">
        <ul className="swiper-wrapper">
          {recommend && recommend.map((item: any, index: number) => {
            const imgpath = getImgPath(item.get('image_path'), 6)
            return (
              <li className='swiper-slide swiper-item' key={item.get('item_id')} >
                <img
                  src={imgpath}
                  onClick={() => {setShowFoodDetail(true); setDetailFood(item.toJS())}}
                  alt={item.get('name')}
                />
                <p className="recomm-name">{item.get('name')}</p>
                <p className="recomm-info">
                  <span className="recomm-info-month">月售{item.get('month_sales')}</span>
                  <span className="recomm-info-rating">好评率{item.get('satisfy_rate')}%</span>
                </p>
                <div className="recomm-bottom">
                  <span className="recomm-bottom-price">
                    ￥{item.get('lowest_price')}
                  </span>
                  <BuyCount food={item} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
})

const mapStateToProps = (state: any) => ({
  recommend: state.getIn(['detail', 'recommend'])
})

export default connect(mapStateToProps, null)(DetailRecomm)