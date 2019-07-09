import './cityitem.scss'
import React, { memo } from 'react'
import { connect } from 'react-redux';

interface ItemProps {
  name: string,
  setFromOrto: any
}

const CityItem = memo((props: ItemProps) => {
  const { name } = props
  return (
    <li className="city-item">{name}</li>
  )
})


export default connect(null, null)(CityItem)