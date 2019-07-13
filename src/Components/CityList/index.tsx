import React, { memo, useRef, useEffect } from 'react'
import BScroll from 'better-scroll'
import './citylist.scss'
import { connect } from 'react-redux';
import * as actions from './../../store/actions/homeAction'

interface ListProps {
  cityList: any,
  city: string,
  ScrollRef: any,
  currentCity: string,
  set_current_city: any,
  setShowCitySelect: any
}

interface SectionProps {
  idx: string,
  cities: Array<object>,
  set_current_city: any,
  setShowCitySelect: any

}


interface ItemProps {
  name: string,
  set_current_city: any,
  setShowCitySelect: any

}

const CityItem = memo((props: ItemProps) => {
  const handleCityClick = () => {
    set_current_city(name)
    setShowCitySelect(false)
  }
  const { name, set_current_city, setShowCitySelect } = props
  return (
    <li className="city-item" onClick={handleCityClick}>{name}</li>
  )
})

const CitySection = memo((props: SectionProps) => {
  const { idx, cities } = props
  return (
    <ul className="city-section">
      <li className='city-section-idx' data-alph={idx}>{idx}</li>
      {cities.map((city: any) => (
        <CityItem
          set_current_city={props.set_current_city}
          name={city.get('name')}
          key={city.get('name')}
          setShowCitySelect={props.setShowCitySelect}
        />
      ))}
    </ul>
  )
})

const CityList = memo((props: ListProps) => {
  const { cityList, city, ScrollRef, currentCity } = props
  const ListRef = useRef(null)
  let current: string
  if (currentCity) {
    current = currentCity
  } else if (city) {
    current = city
  } else {
    current = '定位中...'
  }
  useEffect(() => {
    if (cityList.size) {
      ScrollRef.current = new BScroll('.city-list-wrapper', {
        scrollY: true,
        click: true
      })
    }
  }, [cityList, ScrollRef])
  return (
    <div className='city-list city-list-wrapper' ref={ListRef} >
      <div className="city-list-content">
        <ul className="city-section">
          <li className="city-section-idx" data-alph='#'>当前定位城市</li>
          <li className="city-item city-item-current">
            <i className="iconfont icon-dingwei3"></i>
            {current}
          </li>
        </ul>
        {cityList.map((list: any) => (
          <CitySection
            idx={list.get('idx')}
            cities={list.get('cities')}
            key={list.get('idx')}
            set_current_city={props.set_current_city}
            setShowCitySelect={props.setShowCitySelect}
          />
        ))}
      </div>

    </div>
  )
})
const mapStateToProps = (state: any) => ({
  city: state.getIn(['home', 'location', 'addressComponent', 'city']),
  currentCity: state.getIn(['home', 'currentCity'])
})

export default connect(mapStateToProps, actions)(CityList)