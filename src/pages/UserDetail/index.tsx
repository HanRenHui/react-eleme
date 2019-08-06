import React, { useCallback } from 'react'
import './userdetail.scss'
import { Button, Toast, Modal } from 'antd-mobile'
import List from '../../Components/List'
import * as actions from './../../store/actions/userAction'
import { connect } from 'react-redux'
import Item from '../../Components/Item'
import {
  edit_name
} from './../../api/user'
const alert = Modal.alert;
const prompt = Modal.prompt;
interface IProps {
  log_out: any,
  history: any,
  userinfo: any,
  edit_name_action: any
}


const UserDetail = (props: IProps) => {
  const { log_out, history, userinfo, edit_name_action } = props
  const phoneNum = userinfo && userinfo.get('phone') && userinfo.get('phone').split('').map((item: string, index: number) => {
    if (index > 2 && index < 7) {
      return '*'
    }
    return item
  })
  const extra =
    <img
      className="extra"
      alt="头像"
      src={`/images/${userinfo && userinfo.get('avatar') ? userinfo.get('avatar') : 'default.png'}`}
    ></img>

  const checkValue = useCallback((newName: string) => {

    if (!newName) {
      return Toast.info('用户名不能为空', 1);
    }
    edit_name(newName, userinfo.get('_id')).then((rs: any) => {
      if (rs.err_code === 0) {
        edit_name_action(rs.newName)
        // 更新本地的数据
        let oldUser = localStorage.getItem('user')
        let newUser = oldUser && JSON.parse(oldUser)
        newUser.name = newName
        localStorage.setItem('user', JSON.stringify(newUser))
        Toast.success('修改成功', 1)

      } else {
        Toast.fail('服务器错误, 请重试')
      }
    })

  }, [edit_name_action, userinfo])
  const handleNameClick = useCallback(() => prompt(
    '修改用户名',
    '请输入新的用户名',
    [
      { text: '取消' },
      { text: '确认修改', onPress: checkValue },
    ],
    'default', ''
  ), [checkValue])

  return (
    <div className="userdetail">
      <List>
        <Item title="头像" weight={true} extra={extra} />
        <Item title="用户名"
          weight={true}
          cb={handleNameClick}
          extra={<span className="extra-msg"
          >{userinfo && userinfo.get('name')}</span>} />
      </List>
      <List header="账号绑定">
        <Item
          title="手机"
          weight={true}
          extra={<span className="extra-msg">{phoneNum}</span>}
          thumb="iconfont icon-44"
        />
      </List>
      <List header="安全设置">
        <Item
          title="登陆密码"
          extra={<span className="extra-msg"><span  style={{ color: '#0097ff' }}
          >修改</span></span>} />
      </List>
      <Button
        className="userdetail-logout"
        onClick={() =>
          alert('退出登陆', '你确定退出吗', [
            { text: 'Cancel' },
            {
              text: 'Ok', onPress: () => {
                Toast.info('退出成功', 1);
                history.push('/my')
                log_out()
              }
            },
          ])
        }
      >
        退出登录
    </Button>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  userinfo: state.getIn(['user', 'userinfo']),
})


export default connect(mapStateToProps, actions)(UserDetail)