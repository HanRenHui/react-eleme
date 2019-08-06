import React, { memo } from 'react'
import './tags.scss'
interface IProps {
  restList: any,
}
const Tag = memo((props: IProps) => {
  const { restList } = props
  return (
    <ul className="rest-list-right-support_tags">
      {restList.get('support_tags').map((tag: string, index: number) => (
        <li key={index} className="rest-list-r-tags-item">
          {tag}
        </li>
      ))}
      {
        restList.getIn(['recommend', 'reason'])
          ?
          <li>
            <img src="https://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png" alt="" />
            口碑人气好店
        </li>
          : null
      }
    </ul>
  )
})

export default Tag