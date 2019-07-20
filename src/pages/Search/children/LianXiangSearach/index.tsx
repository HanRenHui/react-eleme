import React, { memo } from 'react'
import { getImgPath } from './../../../../util/getImgPath'
import './LianXiangSearach.scss'
interface LianXProps {
  resultList: any,
  kw: string
}

const LianXiangSearach = memo((props: LianXProps) => {
  const { resultList, kw } = props
  if ((resultList.restaurants && resultList.restaurants.length)
    || (resultList.words && resultList.words.length)
  ) {
    return (
      <ul className="search-lianxiang-list">
        {resultList.restaurants && resultList.restaurants.map((item: any) => (
          <li key={item.id} className="search-lx-list-item more-height">
            <img src={getImgPath(item.image_path, 1)} alt={item.name} />
            <div className='search-lx-list-item-left-content'>
              <div className="search-lx-list-item-left-content">
                <span className='search-lx-list-item-name'>{item.name} </span>
                {item.tags && item.tags.forEach((tag: any) => {
                  return (
                    <p
                      key={tag.name}
                      style={{ color: '#fff', background: `#${tag.name_color}` }}
                      className="search-lx-list-item-tag"
                    >{tag.name}</p>
                  )
                }

                )}
              </div>
              <span className="search-lx-list-item-rating">评价{item.rating}</span>

            </div>

          </li>
        ))}
        {resultList.words && resultList.words.map((item: string) => (
          <li key={item} className="search-lx-list-item">
            <i className="iconfont icon-sousuo"></i>
            <p className="search-lx-list-item-word">
              {item}
            </p>

          </li>
        ))}
      </ul>
    )
  } else {
    return (
      <div className="search-follow">
        <i className="iconfont icon-sousuo"></i>
        <span>查找</span><span className="kw">"{kw}"</span>
      </div>
    )

  }
})
export default LianXiangSearach