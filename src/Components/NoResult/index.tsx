import './noresult.scss'
import React, { memo } from 'react'
interface IProps {
  title: string, 
  des: string
}
const NoResult = memo((props: IProps) => {
  const { title, des} = props
  return (
    <div className="noresult">
      <img src="https://fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif" alt="没有结果" />
      <p>{title}</p>
      <span>{des}</span>
    </div>
  )
})

export default NoResult
