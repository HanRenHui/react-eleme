import './citysection.scss'
import React, { memo } from 'react'
import CityItem from './../CityItem'

interface SectionProps {
  idx: string,
  cities: Array<object>
}
function CitySection(props: SectionProps) {
  const { idx, cities } = props
  return (
    <ul className="city-section">
      <li className='city-section-idx' >{idx}</li>
      {/* {cities.map((city: any) => (
        <CityItem name={city.get('name')}  key={city.get('name')} />
      ))} */}
    </ul>
  )
}

export default memo(CitySection)