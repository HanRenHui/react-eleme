import React, { memo, useCallback, useState, useEffect } from 'react'
import Header from './../../../../Components/Header'
import { Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { req_local_suggestion } from './../../../../api/home'
import * as actions from '../../../../store/actions/homeAction'
import NoResult from '../../../../Components/NoResult/index'
import './addressmodel.scss'
import SearchItem from './../../../../Components/AddSearchItem'
interface IProps {
  hide: any,
  city: string,
  select_address: any,
  setShowCityModel: any
  currentCity: string,
  setLatLnt: any

}

interface AddressInputProps {
  city: string,
  adressSearch: any,
  inputMsg: string,
  setInputMsg: any,
  setShowCityModel: any,
  currentCity: string
}

// 地址输入框组件
const AddressInput = memo((props: AddressInputProps) => {
  const {
    city,
    adressSearch,
    inputMsg,
    setInputMsg,
    setShowCityModel,
    currentCity
  } = props
  let current 
  if (currentCity) {
    current = currentCity
  } else if (city) {
    current = city
  } else {
    current = '定位中...'
  }
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
    <div className='model-address-input'>
      <div className="container model-address-input-content">
        <div className="model-add-input-left" onClick={() => setShowCityModel(true)}>
          <i className="iconfont icon-dingwei3"></i>
          <span>{current}</span>
        </div>
        <div className="model-add-input-wrapper">
          <Icon type="search" className="model-add-input-search" size={'xs'} />
          <input 
            type="text" 
            placeholder="请输入地址"  
            // onChange={(e: any) => handleChange(e)} 
            onInput={handleChange}
            onCompositionStart={handleStart}
            onCompositionEnd={handleEnd}
          />
        </div>
      </div>

    </div>
  )
})





const AddressModel = memo((props: IProps) => {
  const {
    city,
    hide,
    select_address,
    setShowCityModel,
    currentCity,
    setLatLnt
  } = props
  const [tips, setTips] = useState([])
  // 用来标记是否有结果
  const [noRs, setnoRs] = useState(false)
  // 用于input的onchange
  const [inputMsg, setInputMsg] = useState('')
  const cb = useCallback(() => {
   hide(false)
   // 退出后清空数据
   setInputMsg('')
   setTips([])
  }, [hide])
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
  return (
    <div className="address-model">
      <Header title="选择收货地址" cb={cb} />
      <AddressInput
        currentCity={currentCity}
        city={city}
        adressSearch={adressSearch}
        inputMsg={inputMsg}
        setInputMsg={setInputMsg}
        setShowCityModel={setShowCityModel}
      />
      <ul className="searchList">
        {tips && tips.map((item: any, index: number) => (
          <SearchItem
            clearStatus={clearStatus}
            select_address={select_address}
            name={item.title}
            hide={hide}
            district={item.district}
            address={item.address}
            key={index}
            setLatLnt={setLatLnt}
            location={item.location}
          />
        ))}
      </ul>
      {
        noRs
          ? <NoResult title='没有搜索结果' des='换个关键字试试' />
          : null
      }
    </div>
  )
})

const mapStateToProps = (state: any) => ({
  city: state.getIn(['home', 'address', 'address_component', 'city']),
  currentCity: state.getIn(['home', 'currentCity'])
})


export default connect(mapStateToProps, actions)(AddressModel)
