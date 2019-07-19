import './noresult.scss'
import React, { memo } from 'react'
interface IProps {
  title: string, 
  des: string,
  img?: string,
  style?: object
}
const NoResult = memo((props: IProps) => {
  let { title, des, img, style} = props
  img = img ? img : 'https://fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif'
  return (
    <div className="noresult" style={style}>
      
      <img src={img} alt="没有结果" />
      
      <p>{title}</p>
      <span>{des}</span>
    </div>
  )
})

export default NoResult
