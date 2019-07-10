import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './my.scss';

interface Header {
  to: string,
  user: any
}

const MyHeader = memo((props: Header) => {
  const { to, user } = props
  const nameInfo = user ? user.get('name') : '登陆/注册'
  const phoneInfo = user 
  ? user.get('phone').split('').map((item: string, index: number) => {
    if (index > 2 && index < 7) {
      
      return '*'
    } 
    return item
  }).join('')
  : '登陆后享受更多特权'
  // console.log(user.get('phone'))

  return (
    <header>
      <Link to={to} className='nav-header'>
        <div className="container header">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAM1BMVEXE5/XI6fbT7fjW7/jl9fvw+f3////a8Pnt+PzL6vb7/v7i8/rP7Pf4/P7e8vn0+/3p9vvI4mwRAAACI0lEQVR4Ae3YBxbkIAgGYDCKgqbc/7LbS5hJexvMNr7Xp/0j9oBzzjnnnHPOuX8Qhq/wycwhJvopxQGfSM2F3pXcOZuj0DaJDN1gpSMRoY9B6Jhk6AALnSsI1tpIV0jrX+ZHyp3putwzN9XA8BmHmvolN1LGCWENp5GUADZYVGyGd1lFC4OJmVYqbKu0MoOFem22TPrv3cf004ywa6A1htvStdw2Go+vcC03C5EuzV3pSv/iQsqCllN4gj1tJmWC+342JV1dx8cGBuR8nEbznVHNkQW28UxKBeV+pRtsCrrMEsDGeLIIVlISgg08HqiYSIlgJRxWuoku8wA2VCU3dwVlZugQnE4PnYt+t05wR6FvysmeIPltrC8mC3U97t65bRQq9whO23uC6gRp9sFMa9NOJ8z2wWF3T1BvDfdXzLLb4oL7a1m9P53mq50PwSR42ltA2v6eEC2uFGH38Ja39wRVDUGDTSJudH+ETSg3G6wuESO8anxSpww3xF+aGvX+yWvQZ72rohQ0O+wFeI6q9QiPYr0cPGih31Rs1pfjBy2/KxnlYjJPtTYwNFy7CE5CnyzGxf4pMWzhQkTWyTjTWkV4hVW6PNhjIWUZdF+okgiDnSakSakhMHAItQhpAXom7xN+8nG1OnTawkRXJARzlc5V6KElOpYadJJH2jdm6CjPtG3O0FmL780eY4MncI5J6CtJMTM8iwODc84555xzzv0PPgKMKi2olgNo0QAAAABJRU5ErkJggg==" alt="" />
          <div className="header-userinfo">
            <h1>{nameInfo}</h1>
            <p><i className="iconfont icon-44"></i> {phoneInfo}</p>
          </div>
          <i className="iconfont icon-youjiantou jiantou"></i>
        </div>

      </Link>
    </header>

  )
})

interface ItemProps {
  data: any
}

const MyItem = memo((props: ItemProps) => {
  const { data } = props
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return (
      <div className="myitem ">
        <p className="container myitem-content">
          <i className={`icon ${data.icon}`}></i>
          <span>{data.title}</span>
          <i className=" iconfont jiantou icon-youjiantou"></i>
        </p>
      </div>
    )
  } else {
    return (
      <ul className="myitem ">
        <div className="container ">
          {data.map((item: any, index: number) => (
            <li key={index} className="myitem myitem-content">
              <i className={`icon ${item.icon}`}></i>
              <span>{item.title}</span>
              <i className=" iconfont jiantou icon-youjiantou"></i>
            </li>
          ))}
        </div>

      </ul>
    )
  }

})

const itemList = [
  { icon: 'iconfont icon-location', title: '我的地址' },
  [
    { icon: 'iconfont money icon-shangcheng', title: '金币商城' },
    { icon: 'iconfont orange icon-lingshilibao', title: '分享拿20元现金' },
  ],
  [
    { icon: 'iconfont icon-huabanfuben', title: '我的客服' },
    { icon: 'iconfont ele icon-changyonglogo40', title: '下载饿了么APP' },
    { icon: 'iconfont icon-ziyuan', title: '规则中心' },
  ]
]

interface IProps {
  user: any
}

const My = (props: IProps) => {
  const { user } = props
  const to = user ? '/UserDetail' : '/login'
  return (
    <div className='my'>
      <MyHeader to={to} user={user} />
      {itemList.map((item, index) => (
        <MyItem data={item} key={index} />
      ))}
      <p className='rule'>隐私政策</p>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  user: state.getIn(['home', 'user'])
})

export default connect(mapStateToProps, null)(My)