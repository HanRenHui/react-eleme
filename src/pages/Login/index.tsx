import React, { useState, useCallback, useRef } from 'react'
import InputItem from './../../Components/InputItem'
import { Button, Toast } from 'antd-mobile'
import { req_sms_code, req_login } from './../../api/user'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/homeAction'
import './login.scss'


interface IProps {
  history: any,
  set_user_info: any
}

const Login = (props: IProps) => {
  // 标记验证码按钮是否可用
  let [isBtnUseful, setUseful] = useState(false)
  // 验证码按钮的文字
  let [btnInfo, setBtnInfo] = useState('获取验证码')
  // 记录手机号
  let [phone, setPhone] = useState('')
  // 记录验证码
  let [smsCode, setCode] = useState('')
  let timer: any = useRef()
  // 第一个表单change事件
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let number: string = e.target.value
    if (number.length <= 11) {
      // 限制输入11位
      setPhone(number)
    }
    if (/^1[3456789]\d{9}$/.test(number)) {
      setUseful(true)
    } else {
      setUseful(false)
    }

  }, [])
  // 第二个表单change事件
  const handlecodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }, [])
  // 获取验证码点击回调
  const BtnCb = useCallback(async () => {
    // 按钮样式变化
    if (isBtnUseful) {
      // 设置按钮为不可用
      let time = 30
      setUseful(false)
      setBtnInfo(`已发送(${time}s)`)
      timer.current = setInterval(() => {
        time -= 1
        setBtnInfo(`已发送(${time}s)`)
        if (time === 0) {
          clearInterval(timer.current)
          // 时间到 设置按钮为可用(根据input里的内容决定)
          setUseful(true)
          setBtnInfo('重新获取')
        }

      }, 1000)
    }
    // 访问短信验证码接口 获取验证码
    let rs = await req_sms_code(phone)
    console.log(rs)

  }, [isBtnUseful, phone])
  // 点击登陆的回调
  const handleLogin = async () => {
    if (!phone) {
      return Toast.fail('请输入正确的手机号', 1)
    } else if (!smsCode) {
      return Toast.fail('请输入验证码', 1)
    }
    // 发送请求判断验证码正不正确
    let rs: any = await req_login(phone, smsCode)
    if (rs.err_code === 1 ) {
      return Toast.fail('验证码输入错误', 1)
    }
    // 登陆成功
    // 跳转到my页面 同时 更新store中的user数据
    props.history.push('/my')
    props.set_user_info(rs)
    localStorage.setItem('user', JSON.stringify(rs))
    // 清空本页面的定时器
    clearInterval(timer.current)

  }
  return (
    <div className='login'>
      <div className='login-content'>
        {/* logo */}
        <img src="//shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png" alt="" />
        {/* 两个输入框 */}
        <InputItem
          placeholder='手机号'
          hasButton={true}
          isBtnUseful={isBtnUseful}
          data={phone}
          cb={handlePhoneChange}
          BtnCb={BtnCb}
          BtnMsg={btnInfo}
        />
        <InputItem
          placeholder='验证码'
          hasButton={false}
          data={smsCode}
          cb={handlecodeChange}
        />
        {/* 协议 */}
        <p className="login-desc">
          新用户登录即自动注册，并表示已同意
          <span>《用户服务协议》</span>
        </p>
        <Button type='primary' onClick={() => handleLogin()} className="login-btn" >登录</Button>
        <p className="about">关于我们</p>
      </div>
    </div>
  )
}

export default connect(null, actions)(Login)