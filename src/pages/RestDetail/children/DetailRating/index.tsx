import React, { useEffect, useState, useRef } from 'react'
import * as actions from './../../../../store/actions/ratingAction'
import { connect } from 'react-redux'
import './detailrating.scss'
import { getImgPath } from './../../../../util/getImgPath'
import { Icon } from 'antd-mobile'
import BScroll from 'better-scroll'
interface IProps {
  get_rating: Function,
  comments: any,
  rating: any,
  tags: any[],
  has_next: boolean,
  showLoading: boolean
}
const DetailRating = (props: IProps) => {
  const { get_rating, comments, rating, tags, has_next, showLoading } = props
  // 记录当前选中类型
  const [currentCode, setCurrentCode] = useState(0)
  const scrollRef = useRef({})
  // 用于better-scroll记录位置
  const [startY, setStartY] = useState(0)
  // 记录当前页码
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    get_rating(currentCode, offset, 8)
    setOffset(offset + 1)
  }, [])

  let [isLoading, setIsLoading] = useState(false)
  let loadmoreBtn
  if (isLoading) {
    loadmoreBtn = (
      <span className='loadmore-content'>
        <Icon type="loading" /> 正在加载中
      </span>
    )
  } else {
    loadmoreBtn = has_next ? (
      <span className='loadmore-content'>下拉加载更多</span>
    ) : <span className='loadmore-content'>没有更多了</span>
  }

  useEffect(() => {
    if (!showLoading) {
      let bscroll: any = scrollRef.current
      if (Object.keys(bscroll).length) {
        bscroll.finishPullUp()
        bscroll.refresh()
      }
      setIsLoading(false)
    }
  }, [showLoading])

  const handleChangeCode = (code: number) => {
    setCurrentCode(code)
    get_rating(code, 0, 8)
    setOffset(1)
    // 初始化bscroll的记录位置
    setStartY(0)
  }
  useEffect(() => {
    let bscroll: any = scrollRef.current
    if (comments.size && !Object.keys(bscroll).length) {
      
      bscroll = new BScroll('.comments-box', {
        scrollY: true,
        click: true,
        startY,
        probeType: 3,
        pullUpLoad: {
          threshold: -100
        }
      })
      bscroll.on('pullingUp', () => {
        if (!isLoading && has_next) {
          setStartY(bscroll.startY)
          get_rating(currentCode, offset, 8)
          setOffset(offset + 1)
          setIsLoading(true)
        }
      })
    }
    return () => {
      if (Object.keys(bscroll).length) {
        (bscroll as any).destroy()
      }
    }
  }, [comments, startY])


  return (
    <div className="detail-rating">
      {/* 头部 */}
      <header className="detail-rating-header">
        <div className="detail-rating-header-left">
          <p className="detail-rating-header-left-shop_score">{(rating.get('shop_score') || 0).toFixed(1)}</p>
          <p className="detail-rating-header-left-shop_info">
            <span>商家评分</span>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" alt="" />
          </p>
        </div>
        <div className="detail-rating-header-right">
          <div className="detail-rating-header-right-left">
            <li className="detail-rating-header-right-left-tast flexcenter">
              <span>味道</span>
              <span>{(rating.get('taste_score') || 0).toFixed(1)}</span>
            </li>
            <li className="detail-rating-header-right-left-package flexcenter">
              <span>包装</span>
              <span>{(rating.get('package_score') || 0).toFixed(1)}</span>
            </li>
          </div>
          <div className="detail-rating-header-right-right">
            <li className="detail-rating-header-right-right-rider">
              <span>配送</span>
              <span>{(rating.get('rider_score') || 0).toFixed(1)}</span>
            </li>
          </div>
        </div>
      </header>
      {/* 评价列表 */}
      <section className="comments-box">
        <section className="comments-wrapper" >
          <ul className="comments-wrapper-tags">
            {tags && tags.map((tag: any) => (
              <li
                key={tag.get('code')}
                onClick={() => handleChangeCode(tag.get('code'))}
                className={`comment-wrapper-tag ${tag.get('name') === '差评' ? 'bad_tag' : ''} ${tag.get('code') === currentCode ? 'selected' : ''}`}
              >
                <span className={`tag_name`}>{tag.get('name')}</span>
                {
                  tag.get('count') > 0
                    ? <span className="tag_code">{tag.get('count')}</span>
                    : null
                }

              </li>
            ))}

          </ul>
          <ul className="comments-list">
            {comments && comments.map((comment: any) => (
              <li className="comments-item" key={comment.get('order_id')}>
                <section className="comments-item-header">
                  {/* 头像 */}
                  {
                    comment.get('avatar')
                      ? <img src={getImgPath(comment.get('avatar'), 8)} className="avatar" />
                      : <img src="http://localhost:8080/images/default.png" className="avatar" />
                  }

                  <p className="com-item-header-center">

                    <span className="com-item-header-center-name">{comment.get('username')}</span>
                    <span className="rating">
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" alt="" />
                      <span className="score">{comment.get('rating')}分</span>
                    </span>
                  </p>
                  <span className="comments-item-header-time">{comment.get('rated_at')}</span>
                </section>
                <section className="comments-item-text">
                  {comment.get('rating_text')}
                </section>
                <section className="comments-items-imgs">
                  {comment.get('order_images') && comment.get('order_images').map((imgObj: any) => {
                    return  <img src={getImgPath(imgObj.get('image_hash'), 9)} key={imgObj.get('food_ids')} alt="" />
                  })}
                </section>
                {/* 底部标签 */}
                <section className="comments-items-tags">
                  {comment.get('food_ratings') && comment.get('food_ratings').map(((tag: any) => (
                    <li className="comments-items-tag" key={tag.get('sku_id')}>
                      {tag.get('rate_name')}
                    </li>
                  )))}
                </section>
              </li>
            ))}
          </ul>
          {
            comments.size
              ? (
                <p className="loadmore">
                  {loadmoreBtn}
                </p>
              )
              : null
          }
        </section>

      </section>


    </div>

  )
}
const mapStateToProps = (state: any) => ({
  comments: state.getIn(['rating', 'comments']),
  rating: state.getIn(['rating', 'rating']),
  tags: state.getIn(['rating', 'tags']),
  has_next: state.getIn(['rating', 'has_next']),
  showLoading: state.getIn(['home', 'showLoading'])
})

export default connect(mapStateToProps, actions)(DetailRating)