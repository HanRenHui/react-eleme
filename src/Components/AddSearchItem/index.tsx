import React, { memo } from 'react'
import './addsearchitem.scss'
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

    select_address(district, address,  name)
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
export default SearchItem

