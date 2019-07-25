import { getImgPath } from './../../../../util/getImgPath'
import React, { memo, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './detailheader.scss'
interface IProps {
  rst: any,
  history: any
}


const DetailHeader = memo((props: IProps) => {
  const { rst, history } = props
  const [showPopup, setShowPopup] = useState(false)
  return (
    <header>
      <section className="detail-header">
      </section>
      <i 
        className="iconfont icon-zuojiantou backbtn"
        onClick={() => history.goBack()}
      ></i>
      <img className="header-brand" src={getImgPath(rst.get('image_path') || '', 4)} alt="" />
      {/* 店铺名称 */}
      <h1 className="detail-header-name">
        <span>{rst.get('name')}</span>
        <i className="iconfont icon-youjiantou1"></i>
      </h1>
      {/* 商铺评价等信息 */}
      <p className="detail-name-bottom">
        <span className="detail-name-bottom-rating">
          评价{rst.get('rating')}
        </span>
        <span className="detail-name-bottom-month">
          月售{rst.get('recent_order_num')}单
        </span>
        <span className="detail-name-bottom-time">
          商家配送约{rst.get('order_lead_time')}分钟
        </span>
      </p>
      {/* 商铺活动 */}
      {
        rst.get('activities') && rst.get('activities').size
          ? (
            <p className="detail-name-activity">
              <span className="detail-name-activity-left">
                <span
                  className="detail-name-activity-left-icon"
                  style={{ backgroundColor: '#' + rst.getIn(['activities', 0, 'icon_color']) }}
                >
                  {rst.getIn(['activities', 0, 'icon_name'])}
                </span>
                <span className="detail-name-activity-left-des">
                  {rst.getIn(['activities', 0, 'description'])}
                </span>
              </span>
              {
                rst.get('activities').size > 1
                  ? <span className="detail-name-activity-right" onClick={() => setShowPopup(true)}>
                    {rst.get('activities').size}个优惠 <i className="iconfont icon-xiajiantou"></i>
                  </span>
                  : null
              }
            </p>
          )
          : null
      }
      {/* 商铺公告 */}
      <p className="detail-header-promotion_info">公告: {rst.get('promotion_info')}</p>
      {/* 优惠的弹窗 */}
      {/* <CSSTransition timeout={200} classNames="pop" in={showPopup}>
        <div className="popup">
          <h3 className="popup-title">优惠活动</h3>
          {rst.get('activities') && rst.get('activities').map((item: any, index: number) => (
            <p className="popup-item" key={index}>
              <span
                className="popup-item-icon"
                style={{ backgroundColor: '#' + item.get('icon_color') }}
              >{item.get('icon_name')}</span>
              <span className="popup-item-des">{item.get('description')}</span>
            </p>
          ))}
        </div>
      </CSSTransition> */}
      {/* 黑色蒙版 */}
      {/* {
        showPopup
          ? <div className="detail-mask" onClick={() => setShowPopup(false)}></div>
          : null
      } */}


    </header>
  )
})

export default DetailHeader