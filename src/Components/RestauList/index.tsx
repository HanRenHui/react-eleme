import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/homeAction'
import './restauList.scss'
interface IProps {
  get_resturant: any,
  rests: any,
}

const RestauList = memo((props: IProps) => {
  const { get_resturant, rests } = props
  useEffect(() => {
    get_resturant(27.818289, 113.107385, 0, 8)
  }, [get_resturant])
  const getRestData = (list: any) => {
    return list.get('restaurant')
  }
  return (
    <ul className="resturant-list">
      {rests && rests.map((list: any, index: number) => {
        let img_path: string = getRestData(list).get('image_path')
        let firstPart: string = img_path.slice(0, 1)
        let secPart: string = img_path.slice(1, 3)
        let thrPart: string = img_path.slice(3)
        let postFix: string
        const restList = getRestData(list)
        // 配送距离过滤
        let distance
        if (restList.get('distance') > 1000) {
          distance = restList.get('distance') / 1000
          distance = distance.toFixed(2) + 'k'
        } else {
          distance = restList.get('distance')
        }
        if (img_path.length === 36) {
          postFix = img_path.slice(-4)
        } else {
          postFix = img_path.slice(-3)
        }
        const allPath =
          `https://fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?
        imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
        return (
          <li key={restList.get('authentic_id')} className="rest-list-li">
            <img src={allPath} className="rest-list-left" alt="" />
            <div className='rest-list-right'>
              {/* 餐厅名字 */}
              <h4>{restList.get('name')}</h4>
              {/* 餐厅评价 */}
              <div className='rest-list-right-rating'>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" alt="" />
                <span className="rest-l-r-r-rating">{restList.get('rating')}</span>
                <span className="rest-l-r-r-order-count">月售{restList.get('recent_order_num')}单</span>
              </div>
              {/* 餐厅起送规则 */}
              <div className='rest-list-right-rules'>
                <p className="rest-l-r-r-left">
                  <span className="l-r-r-left-qs-fee">￥{restList.getIn(['piecewise_agent_fee', 'rules', 0, 'price'])}起送</span>
                  <span className="l-r-r-left-agent-fee">{restList.getIn(['piecewise_agent_fee', 'tips'])}</span>
                </p>
                <p className="rest-l-r-r-right">
                  <span className="rest-l-r-r-distance">
                    {distance}m
                  </span>
                  <span className='rest-l-r-r-order-time'>
                    {restList.get('order_lead_time')}分钟
                  </span>
                </p>
              </div>
              {/* support_tags */}
              <ul className="rest-list-right-support_tags">
                {restList.get('support_tags').map((tag: any, index: number) => (
                  <li key={index} className="rest-list-r-tags-item">
                    {tag.get('text')}
                  </li>
                ))}
                {
                  restList.getIn(['recommend', 'reason'])
                    ?
                    <li>
                      <img src="https://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/webp/thumbnail/!20x20r/gravity/Center/crop/20x20/" alt="" />
                      口碑人气好店
                    </li>
                    : null
                }
              </ul>
              {/* 商家活动 */}
              <section className="rest-list-right-acti">
                {restList.get('activities').map((item: any, idx: number) => {
                  const style = { background:  '#' + item.get('icon_color')}
                  return (
                    <div key={idx} className="rest-list-right-act-item">
                      <span style={style} className="rest-l-right-act-icon-name">{item.get('icon_name')}</span>
                      <span className="rest-l-right-act-icon-des">{item.get('description')}</span>
                    </div>
                  )
                }

                )}
              </section>
            </div>
          </li>
        )
      })}
    </ul>
  )
})
const mapStateToProp = (state: any) => ({
  rests: state.getIn(['home', 'resturants']),
})
export default connect(mapStateToProp, actions)(RestauList)