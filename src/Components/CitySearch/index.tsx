import './citysearch.scss'
import { connect } from 'react-redux'
import React, { memo } from 'react'
import * as actions from './../../store/actions/homeAction'
interface IProps {
  keyword: string,
  cityList: any,
  clearkey: any,
  setShowCitySelect: any,
  set_current_city: any,
}

const SearchItem = memo((props: IProps) => {
  const { keyword, cityList, setShowCitySelect } = props
  const rs: any = []
  cityList.forEach((item: any) => {
    item.get('cities').forEach((city: any) => {
      if (city.get('pinyin').includes(keyword) ) rs.push(city.get('name'))
      if (city.get('name').includes(keyword) ) rs.push(city.get('name'))
    })
  })
  const handleClick = (city: string) => {
    setShowCitySelect(false)
    props.set_current_city(city)
  }
  return (
    rs.length ? 
    <ul className='citysearch'>
      {rs.map((city: string, index: number) => (
        <li 
          key={index} 
          className="citysearch-item"
          onClick={() => handleClick(city)}
        >{city}</li>
      ))}
    </ul>
    : <div className="no-result">无结果</div>
  )
})
export default connect(null, actions)(SearchItem)
