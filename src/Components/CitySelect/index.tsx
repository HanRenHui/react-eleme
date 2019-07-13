import React, { memo, useEffect, useCallback, useState, useRef } from 'react'
import { connect } from 'react-redux'
import CityList from '../CityList'
import Header from '../Header'
import * as actions from '../../store/actions/homeAction'
import CitySearch from '../CitySearch'
import './cityselect.scss'
import { Icon } from 'antd-mobile'

interface SelectProps {
  show: boolean,
  req_city_list: () => void,
  cityList: Array<string>,
  setShowCitySelect: (x: boolean) => void,
}

const alpList = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'k', 'L', 'M', 'N',
  'p', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']

interface IAlph {
  toAlph: any
}

const AlphIndex = memo((props: IAlph) => {
  const { toAlph } = props
  return (
    <ul className="cityselect-alph">
      {alpList.map((item: string, index: number) => (
        <li className="alph-item" key={item} onClick={() => toAlph(item)} >{item}</li>
      ))}
    </ul>
  )
})

const CitySelect = (props: SelectProps) => {
  const {
    show,
    req_city_list,
    cityList,
    setShowCitySelect,
  } = props
  const [key, setKey] = useState('')
  const ScrollRef = useRef()
  const clearkey = useCallback(() => {
    setKey('')
  }, [])
  useEffect(() => {
    if (show && !cityList.length) {
      req_city_list()
    }
  }, [show, cityList.length, req_city_list])
  const toAlph = useCallback((alph: string) => {
    const aplElement = document.querySelector(`[data-alph='${alph}']`)
    const scroll: any = ScrollRef.current
    scroll.scrollToElement(aplElement, 250)
  }, [])
  return (
    <div className={`cityselect city-model`}>
      <div className="cityselect-tab" >
        <Header title='城市选择' cb={() => setShowCitySelect(false)} />
        <div className="cityselect-input">
          <div className='cityselect-input-inner'>
            <Icon type="search" className="citys-input-icon" size="xs" />
            <input
              type="text"
              value={key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
              placeholder='输入城市名或者拼音'
            />
          </div>
        </div>
      </div>
      {key ? null : <CityList cityList={cityList || []} ScrollRef={ScrollRef} setShowCitySelect={setShowCitySelect} />}
      {key ? null : <AlphIndex toAlph={toAlph} />}
      {
        key
          ? <CitySearch
              keyword={key}
              clearkey={clearkey}
              cityList={cityList}
              setShowCitySelect={setShowCitySelect}
            />
          : null
      }
    </div >
  )
}

const mapStateToProps = (state: any) => ({
  cityList: state.getIn(['home', 'cityList']),
})

export default connect(mapStateToProps, actions)(memo(CitySelect))