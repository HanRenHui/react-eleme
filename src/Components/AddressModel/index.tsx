import React, { memo, useCallback, useState, useEffect } from 'react'
import Header from './../Header'
import { Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getSearchTips } from './../../util/gaodeAPI'
import * as actions from './../../store/actions/homeAction'
import './addressmodel.scss'
interface IProps {
  hide: any,
  city: string,
  select_address: any,
  setShowCityModel: any
  currentCity: string
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
  const handleChange = (e: any) => {
    setInputMsg(e.target.value)
  }
  useEffect(() => {
    adressSearch(inputMsg)
  }, [inputMsg, adressSearch])
  return (
    <div className='model-address-input'>
      <div className="container model-address-input-content">
        <div className="model-add-input-left" onClick={() => setShowCityModel(true)}>
          <i className="iconfont icon-dingwei3"></i>
          <span>{current}</span>
        </div>
        <div className="model-add-input-wrapper">
          <Icon type="search" className="model-add-input-search" size={'xs'} />
          <input type="text" placeholder="请输入地址" value={inputMsg} onChange={(e: any) => handleChange(e)} />
        </div>
      </div>

    </div>
  )
})

interface searchItemProps {
  name: string,
  district: string,
  address: string,
  select_address: any,
  hide: any,
  clearStatus: any
}

// 搜索提示item组件
const SearchItem = memo((props: searchItemProps) => {
  const { name, district, address, select_address, hide, clearStatus } = props
  const handleSelectAddress = () => {
    select_address(district + address + name)
    // 回到首页主面板
    hide(false)
    // 清空状态
    clearStatus()
  }
  return (
    <li className='search-item' onClick={handleSelectAddress}>
      <div className='container'>
        <h4 className="search-item-title">{name}</h4>
        <p className="search-item-desc">{district}{address}</p>
      </div>
    </li>
  )
})


// 找不到结果组件
const NoResult = memo(() => {
  return (
    <div className="address-model-noresult">
      <img src="https://fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif" alt="没有结果" />
      <p>没有搜索结果</p>
      <span>换个关键字试试</span>
    </div>
  )
})



const AddressModel = memo((props: IProps) => {
  const {
    city,
    hide,
    select_address,
    setShowCityModel,
    currentCity
  } = props
  const [tips, setTips] = useState([])
  // 用来标记是否有结果
  const [noRs, setnoRs] = useState(false)
  // 用于input的onchange
  const [inputMsg, setInputMsg] = useState('')

  const adressSearch = useCallback((keyword) => {
    getSearchTips(city, keyword, (status: string, result: any) => {
      // 获取搜索提示
      setnoRs(false)
      if (!Object.keys(result).length) {
        setnoRs(true)
      }
      setTips(result.tips)
    })
  }, [city])
  // 地址选中以后清除状态
  const clearStatus = useCallback(() => {
    setInputMsg('')
    setTips([])
  }, [])
  return (
    <div className="address-model">
      <Header title="选择收货地址" cb={() => hide(false)} />
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
            name={item.name}
            hide={hide}
            district={item.district}
            address={item.address}
            key={index}
          />
        ))}
      </ul>
      {
        noRs
          ? <NoResult />
          : null
      }
    </div>
  )
})

const mapStateToProps = (action: any) => ({
  city: action.getIn(['home', 'location', 'addressComponent', 'city']),
  currentCity: action.getIn(['home', 'currentCity'])
})


export default connect(mapStateToProps, actions)(AddressModel)
