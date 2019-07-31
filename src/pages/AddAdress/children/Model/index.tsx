import React, { memo, useState, useCallback, useEffect } from 'react'
import "./model.scss"
import Header from './../../../../Components/Header'
import SearchItem from './../../../../Components/AddSearchItem'
import { connect } from 'react-redux'
import NoResult from './../../../../Components/NoResult'
import { req_local_suggestion } from './../../../../api/home'

interface IProps {
  setShow: Function,
  city: string,
  setAddress: Function,
  currentCity: string
}
const Model = memo((props: IProps) => {
  const { setShow, city, setAddress, currentCity } = props
  const [tips, setTips] = useState([])
  // 用来标记是否有结果
  const [noRs, setnoRs] = useState(false)
  // 用于input的onchange
  const [inputMsg, setInputMsg] = useState('')

  const adressSearch = useCallback((keyword) => {
    ; (async () => {
      setnoRs(false)
      let region = currentCity || city
      let rs: any = await req_local_suggestion(keyword, region)
      if (rs.data && !rs.data.length) setnoRs(true)
      setTips(rs.data)
    })()
  }, [city, currentCity])
  // 地址选中以后清除状态
  const clearStatus = useCallback(() => {
    setInputMsg('')
    setTips([])
  }, [])
  // 标记是输入拼音还是汉字中
  let [flag, setFlag] = useState(false)
  const handleChange = (e: any) => {
    if (flag) {
      setInputMsg(e.target.value)
    }
  }
  useEffect(() => {
    adressSearch(inputMsg)
  }, [inputMsg, adressSearch])

  const handleStart = (e: any) => {
    setFlag(false)
  }
  const handleEnd = (e: any) => {
    setFlag(true)
    setInputMsg(inputMsg + e.data)
  }
  return (
    <div className="add-address-model">
      <Header title="搜索地址" cb={() => setShow(false)} />
      {/* 搜索框 */}
      <section className="address-model-input-section">
        <div className="address-model-input-wrapper">
          <i className="iconfont icon-sousuo"></i>
          <input
            type="text"
            placeholder="请输入小区/写字楼/学校等"
            onInput={handleChange}
            onCompositionStart={handleStart}
            onCompositionEnd={handleEnd}
          />
        </div>
        <button className="address-model-input-btn" >搜索</button>
      </section>
      <ul className="searchList">
        {tips && tips.map((item: any, index: number) => (

          <SearchItem
            clearStatus={clearStatus}
            select_address={setAddress}
            name={item.title}
            hide={() => setShow(false)}
            district={item.district}
            address={item.address}
            key={index}
           location={item.location}

          />
        ))}
      </ul>
      {
        noRs
          ? <NoResult title='没有搜索结果' des='换个关键字试试' img="//fuss10.elemecdn.com/2/50/8019fbaebac2aaa76e2d9b5e5b407gif.gif"/>
          : null
      }
    </div>

  )
})
const mapStateToProps = (state: any) => ({
  city: state.getIn(['home', 'location', 'addressComponent', 'city']),
  currentCity: state.getIn(['home', 'currentCity'])
})
export default connect(mapStateToProps, null)(Model)