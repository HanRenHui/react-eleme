import React, { memo } from 'react'
import './item.scss'
interface IProps {
  thumb?: any,
  title: string,
  extra?: any,
  weight?: boolean,
  cb?: any
}
const Item = memo((props: IProps) => {
  const { thumb, title, extra, weight, cb } = props
  return (
    <li className='item' onClick={cb}>
      <div className='item-container'>
        <div className="item-left">
          {thumb
            ? <i className={`thumb ${thumb}`}></i>
            : null
          }
          <span className={`item-title ${weight ? 'weight': ''}`}>{title}</span>
        </div>

        <div className="item-right">
          {extra}
          <i className="iconfont icon-youjiantou icon"></i>
        </div>
      </div>

    </li>
  )
})
export default Item