import React, { useState, useCallback, useMemo } from 'react'
import InputItem from './../../Components/InputItem'
import { Button } from 'antd-mobile'
import './login.scss'

const Login: React.FC = () => {
  // 标记验证码按钮是否可用
  let [isBtnUseful, setUseful] = useState(false)
  // 记录手机号
  let [phone, setPhone] = useState('')
  // 记录验证码
  let [code, setCode] = useState('')
  const isUserful = useMemo(() => isBtnUseful, [isBtnUseful])
  const Code = useMemo(() => code, [code])
  let handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(0)
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
  let handlecodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }, [])

  return (
    <div className='login'>
      <div className='login-content'>
        {/* logo */}
        <img src="//shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png" alt="" />
        {/* 两个输入框 */}
        <InputItem
          placeholder='手机号'
          hasButton={true}
          isBtnUseful={isUserful}
          data={phone}
          cb={handlePhoneChange}
        />
        <InputItem
          placeholder='验证码'
          hasButton={false}
          data={Code}
          cb={handlecodeChange}
        />
        {/* 协议 */}
        <p className="login-desc">
          新用户登录即自动注册，并表示已同意
          <span>《用户服务协议》</span>
        </p>
        <Button type='primary' className="login-btn" >登录</Button>
        <p className="about">关于我们</p>
      </div>
    </div>
  )
}

export default Login 