import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './order.scss'
import { get_order } from './../../api/user'
import { getImgPath } from './../../util/getImgPath'
import dateFormat from './../../util/dateFormat'
import NoResult from './../../Components/NoResult'
import { Link } from 'react-router-dom'

interface IProps {
  userId: string,
  history: any
}
const Order = (props: IProps) => {
  const { userId, history } = props
  const [orderList, setOrderList] = useState([])
  // 标记订单是否为空
  const [isNull, setIsNull] = useState(false)
  useEffect(() => {
    ; (async () => {
      let rs: any = await get_order(userId)
      if (!rs.length) setIsNull(true)
      setOrderList(rs)
    })()
  }, [userId])
  let content
  if (userId) {
    if (orderList.length) {
      content = (
        <div className="order">
          {
            orderList.map((order: any) => {
              let firstName = order.group[0].name
              let totalCount = order.group.reduce((pre: number, next: any) => {
                return pre + next.quantity
              }, 0)
              return (
                <div className="order-item" key={order._id}>
                  <section className="order-header">
                    <img src={getImgPath(order.restaurant_image_hash, 11)} />
                    <div className="order-header-right">
                      <p className="order-header-right-top">
                        <span className="order-header-right-top-left">
                          {order.restaurant_name}<i className="iconfont icon-youjiantou"></i>
                        </span>
                        <span className="order-header-right-top-right">订单已完成</span>
                      </p>
                      <p className="order-header-right-bottom">{dateFormat(order.formatted_created_at)}</p>

                    </div>
                  </section>
                  <section className="order-content">
                    <p className="order-content-left">
                      <span>{firstName}</span>
                      {
                        totalCount > 1
                          ? <span>等{totalCount}件商品</span>
                          : null
                      }
                    </p>
                    <p className="order-content-right">￥{order.total_amount.toFixed(2)}</p>
                  </section>
                  <section className="order-content-btn">
                    <button onClick={() => history.push('/detail/123/foods')}>再来一单</button>
                  </section>
                </div>

              )
            })
          }

        </div>

      )
    } else {
      content = (
        <div className="order">
          <NoResult
            img="//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
            title="最近没有外卖订单"
            des="快去下单吧"
          />
        </div>
      )
    }
  } else {
    content = (
      <div className="need-login">
        <NoResult
          img="//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
          title="登录后查看外卖订单"
        />

        <Link to='/login' className="log-btn">
          登录
        </Link>
      </div>
    )
  }
  return (
    <>
      {
        !orderList.length && !isNull
          ? (
            <ul className="order-ske">
              <li><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NTAgMzI1Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHdpZHRoPSI3NTAiIGhlaWdodD0iMzI1IiBmaWxsPSIjRkZGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeD0iMzAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIyIiB4PSIxMTAiIHk9IjcwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iNDI3IiBoZWlnaHQ9IjI2IiB4PSIxMTAiIHk9IjE1MCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiIHJ4PSI0Ii8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBkPSJNMTExLjUgMTI1aDYyME0zMC41IDIwNy41bDY5MyA3Ii8+PHJlY3Qgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgeD0iNTg5IiB5PSIyNDYiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMjYiIHg9IjYxNSIgeT0iMTUwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMjEwIiBoZWlnaHQ9IjMyIiB4PSIxMTAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iOTAiIGhlaWdodD0iMjYiIHg9IjY0NSIgeT0iMzEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjwvZz48L3N2Zz4=" alt="" /></li>
              <li><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NTAgMzI1Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHdpZHRoPSI3NTAiIGhlaWdodD0iMzI1IiBmaWxsPSIjRkZGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeD0iMzAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIyIiB4PSIxMTAiIHk9IjcwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iNDI3IiBoZWlnaHQ9IjI2IiB4PSIxMTAiIHk9IjE1MCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiIHJ4PSI0Ii8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBkPSJNMTExLjUgMTI1aDYyME0zMC41IDIwNy41bDY5MyA3Ii8+PHJlY3Qgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgeD0iNTg5IiB5PSIyNDYiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMjYiIHg9IjYxNSIgeT0iMTUwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMjEwIiBoZWlnaHQ9IjMyIiB4PSIxMTAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iOTAiIGhlaWdodD0iMjYiIHg9IjY0NSIgeT0iMzEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjwvZz48L3N2Zz4=" alt="" /></li>
              <li><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NTAgMzI1Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHdpZHRoPSI3NTAiIGhlaWdodD0iMzI1IiBmaWxsPSIjRkZGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeD0iMzAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIyIiB4PSIxMTAiIHk9IjcwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iNDI3IiBoZWlnaHQ9IjI2IiB4PSIxMTAiIHk9IjE1MCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiIHJ4PSI0Ii8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBkPSJNMTExLjUgMTI1aDYyME0zMC41IDIwNy41bDY5MyA3Ii8+PHJlY3Qgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgeD0iNTg5IiB5PSIyNDYiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMjYiIHg9IjYxNSIgeT0iMTUwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMjEwIiBoZWlnaHQ9IjMyIiB4PSIxMTAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iOTAiIGhlaWdodD0iMjYiIHg9IjY0NSIgeT0iMzEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjwvZz48L3N2Zz4=" alt="" /></li>
              <li><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NTAgMzI1Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHdpZHRoPSI3NTAiIGhlaWdodD0iMzI1IiBmaWxsPSIjRkZGIiByeD0iNSIvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgeD0iMzAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIyIiB4PSIxMTAiIHk9IjcwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iNDI3IiBoZWlnaHQ9IjI2IiB4PSIxMTAiIHk9IjE1MCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiIHJ4PSI0Ii8+PHBhdGggc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBkPSJNMTExLjUgMTI1aDYyME0zMC41IDIwNy41bDY5MyA3Ii8+PHJlY3Qgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgeD0iNTg5IiB5PSIyNDYiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMjYiIHg9IjYxNSIgeT0iMTUwIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iMjEwIiBoZWlnaHQ9IjMyIiB4PSIxMTAiIHk9IjI4IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgcng9IjQiLz48cmVjdCB3aWR0aD0iOTAiIGhlaWdodD0iMjYiIHg9IjY0NSIgeT0iMzEiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1IiByeD0iNCIvPjwvZz48L3N2Zz4=" alt="" /></li>
            </ul>
          )
          : (
            content
          )
      }
    </>

  )
}

const mapStateToProps = (state: any) => ({
  userId: state.getIn(['user', 'userinfo', '_id']),
})
export default connect(mapStateToProps)(Order)
