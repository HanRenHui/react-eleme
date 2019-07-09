import CitySection from './../CitySection'
import React, { memo } from 'react'
import './citylist.scss'

interface ListProps {
  cityList: any,
}



function CityList(props: ListProps) {
  const { cityList } = props
  return (
    <div className={`city-list`}>
      {cityList.map((list: any) => {
        return <CitySection idx={list.get('idx')} cities={list.get('cities')} key={list.get('idx')} />
      })}
    </div>
  )
}


export default memo(CityList)