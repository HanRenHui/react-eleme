import React, { memo } from 'react'
import './hotlist.scss'
interface ListProps {
  title: string,
  hostList: any
}


/**
 * 热门搜索和历史搜索组件
 */
const HotList = memo((props: ListProps) => {
  const { title, hostList } = props
  return (
    <div className="search-hot-wrapper">
      <h3 className="search-hot">{title}</h3>
      <ul className="search-recommond">
        {(hostList as any).map((item: any) => (
          <li className="search-recomond-li" key={item.word}>{item.word}</li>
        ))}
      </ul>
    </div>


  )
})

export default HotList