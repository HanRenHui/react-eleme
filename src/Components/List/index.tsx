import React, { memo } from 'react'
import './list.scss'
interface IProps {
  children: any
  header?: string
}

const List = memo((props: IProps) => {
  const { header } = props
  return (
    <div className="list">
      {
        header
          ? <p className='list-header'>{header}</p>
          : null
      }
      <ul className="list-content">
        {props.children}
      </ul>
    </div>
  )
})

export default List