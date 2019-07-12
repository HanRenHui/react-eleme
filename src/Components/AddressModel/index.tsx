import React, { memo, useCallback, useState } from 'react'
import Header from './../Header'
import { Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getSearchTips } from './../../util/gaodeAPI'
import './addressmodel.scss'
interface IProps {
  hide: any,
  city: string
}

interface AddressInputProps {
  city: string,
  handleChange: any
}

// 地址输入框组件
const AddressInput = memo((props: AddressInputProps) => {
  const { city, handleChange } = props
  return (
    <div className='model-address-input'>
      <div className="container model-address-input-content">
        <div className="model-add-input-left">
          <i className="iconfont icon-dingwei3"></i>
          <span>{city ? city : '定位中..'}</span>
        </div>
        <div className="model-add-input-wrapper">
          <Icon type="search" className="model-add-input-search" size={'xs'} />
          <input type="text" placeholder="请输入地址" onChange={handleChange} />
        </div>
      </div>

    </div>
  )
})

interface searchItemProps {
  name: string,
  district: string,
  address: string
}

// 搜索提示item组件
const SearchItem = memo((props: searchItemProps) => {
  const { name, district, address } = props
  return (
    <li className='search-item'>
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
  const { city, hide } = props
  const [tips, setTips] = useState([])
  // 用来标记是否为空
  const [noRs, setnoRs] = useState(false)
  const handleChange = useCallback((e: any) => {
    getSearchTips(city, e.target.value, (status: string, result: any) => {
      // 获取搜索提示
      setnoRs(false)
      if (!Object.keys(result).length) {
        setnoRs(true)
      }
      setTips(result.tips)

    })
  }, [])
  return (
    <div className="address-model">
      <Header title="选择收货地址" cb={() => hide(false)} />
      <AddressInput city={city} handleChange={handleChange} />
      <ul className="searchList">
        {tips && tips.map((item: any, index: number) => (
          <SearchItem
            name={item.name}
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
  city: action.getIn(['home', 'location', 'addressComponent', 'city'])
})


export default connect(mapStateToProps, null)(AddressModel)
