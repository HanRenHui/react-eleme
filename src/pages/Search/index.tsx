import React, { useEffect, useState } from 'react'
import { req_hot_search } from './../../api/search'
import { connect } from 'react-redux'
interface IProps {
  lat: number,
  lng: number
}
const Search = (props: IProps) => {
  const {
    lat,
    lng
  } = props
  let [hostList, setHostList] = useState([])
  useEffect(() => {
    ; (async () => {
      let rs = await req_hot_search(lat, lng)
      // setHostList(JSON.parse(rs))
      console.log(rs)
      // console.log(JSON.parse(rs))
    })()
  }, [])
  return (
    <div>search page</div>
  )
}
const mapStateToProps = (state: any) => ({
  lat: state.getIn(['home', 'lat']),
  lng: state.getIn(['home', 'lng']),
})

export default connect(mapStateToProps, null)(Search)