import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import List from './../../Components/List'
import Item from './../../Components/Item'
import './my.scss';

interface Header {
  to: string,
  user: any,
  avatar: string
}

const MyHeader = memo((props: Header) => {
  const { to, user, avatar } = props
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
          <img src={`http://localhost:1888/public/images/${avatar ? avatar : 'default.png'}`} alt="" />
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

interface IProps {
  user: any, 
  avatar: string,
  history: any
}

const My = (props: IProps) => {
  const { user, avatar, history } = props
  const to = user ? '/userdetail' : '/login'
  return (
    <div className='my'>
      <MyHeader avatar={avatar} to={to} user={user} />
      <List>
        <Item title="我的地址" cb={() => history.push('/myaddress')} thumb="iconfont icon-location"/>
      </List>
      <List>
        <Item title="金币商城" thumb="iconfont money icon-shangcheng"/>
        <Item title="分享拿20元现金" thumb="iconfont present icon-lingshilibao"/>
      </List>
      <List>
        <Item title="我的客服" thumb="iconfont icon-htmal5icon31"/>
        <Item title="下载饿了么APP" thumb="iconfont ele icon-APP"/>
        <Item title="规则中心" thumb="iconfont  icon-hetong"/>
      </List>
      <p className='rule'>隐私政策</p>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  user: state.getIn(['user', 'userinfo']),
  avatar: state.getIn(['user', 'avatar'])
})

export default connect(mapStateToProps, null)(My)