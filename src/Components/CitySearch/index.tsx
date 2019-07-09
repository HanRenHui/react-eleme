import './citysearch.scss'
import { connect } from 'react-redux'
import React, { memo } from 'react'

interface IProps {
  keyword: string,
  cityList: any,
  setFromOrto: any,
  clearkey: any
}

const SearchItem = memo((props: IProps) => {
  const { keyword, cityList, setFromOrto, clearkey } = props
  console.log(keyword)
  const rs: any = []
  cityList.forEach((item: any) => {
    item.get('cities').forEach((city: any) => {
      if (city.get('pinyin').includes(keyword) ) rs.push(city.get('name'))
    })
  })
  // })
  return (
    rs.length ? 
    <ul className='citysearch'>

      {rs.map((city: string, index: number) => (
        <li 
          key={index} 
          className="citysearch-item"
         
        >{city}</li>
      ))}
    </ul>
    : <div className="no-result">无结果</div>
  )
})
export default connect(null, null)(SearchItem)
