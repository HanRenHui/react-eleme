import React, { useEffect, useState, memo } from 'react'
import { req_hot_search } from './../../api/search'
import { connect } from 'react-redux'
import { req_hot_search_wd } from './../../api/search'
import RestSearchList from './children/RestSearchList'
import LianXiangSearach from './children/LianXiangSearach'
import * as actions from '../../store/actions/searchActions'
import { Toast } from 'antd-mobile'
import './search.scss'
import HotList from './children/HotList'
interface IProps {
  lat: number,
  lng: number,
  history: any,
  req_search_list: any,
  offset: number,
  restsSearchList: any
}


const Search = (props: IProps) => {
  const { history, req_search_list, lat, lng, offset } = props
  let [hostList, setHostList] = useState<object>([])
  let [lianxiang, setLiangxiang] = useState<object>([])
  // 标记是输入拼音还是汉字中
  let [flag, setFlag] = useState(false)
  let [kw, setKw] = useState('')
  // 标记是否显示搜索的列表
  let [showSeachList, setShowSearchList] = useState(false)

  const handleChange = (e: any) => {
    if (flag) {
      setKw(e.target.value)
      setShowSearchList(false)
    }
  }

  const handleStart = (e: any) => {
    setFlag(false)
  }
  const handleEnd = (e: any) => {
    setFlag(true)
    setKw(kw + e.data)
    setShowSearchList(false)
  }
  // 监听搜索按钮的点击 
  const handleSearch = () => {
    if (!kw) return
    const kwList = ['hanbao', 'han', 'bao', '汉', '堡', '汉堡', '麦当劳', '肯德基', '炸鸡', '鸡腿']
    // console.log(kw.includes('汉堡'))
    if (!(kwList.includes(kw))) return Toast.info('该关键字数据还未补全, 输入汉堡试试', 1)
    setShowSearchList(true)
    req_search_list(0, kw, lat, lng)
    document.body.scrollTop = 0
  }


  // 请求热门搜索
  useEffect(() => {
    ; (async () => {
      if (lat === 0 && lng === 0) return
      let rs = await req_hot_search(lat, lng)
      setHostList(rs)
    })()
  }, [lat, lng])

  // 监听关键字变化 进行联想搜索
  useEffect(() => {
    ; (async () => {
      if (!kw) return
      let rs: any = await req_hot_search_wd(lat, lng, encodeURI(kw))
      setLiangxiang(rs)
    })()
  }, [kw])

  return (
    <div className="search">
      <div className="search-sticky">
        <div className="search-header">
          <i
            className="iconfont icon-zuojiantou"
            onClick={() => history.goBack()}
          ></i>
        </div>
        {/* 搜索部分 */}
        <div className="search-box">
          <div className="search-box-left">
            <i className="iconfont icon-sousuo"></i>
            <input
              className="search-input"
              type="text"
              onInput={handleChange}
              onCompositionStart={handleStart}
              onCompositionEnd={handleEnd}
              placeholder="输入商家丶商品名称"
            />
          </div>
          <button className="search-box-right" onClick={handleSearch}>
            搜索
          </button>
        </div>
      </div>
      {/* 未搜索的时候显示 */}
      {
        showSeachList
          ? <RestSearchList kw={kw} history={history}/>
          : <>
            {!kw ?
              (
                <div className="search-bottom">
                  {/* 热门搜索 */}
                  <HotList title="热门搜索" hostList={hostList} />
                </div>
              )
              : (
                <LianXiangSearach resultList={lianxiang} kw={kw} />
              )
            }
          </>
      }
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  lat: state.getIn(['home', 'lat']),
  lng: state.getIn(['home', 'lng']),
  offset: state.getIn(['search', 'offset']),
  restsSearchList: state.getIn(['search', 'restsSearchList']),
})

export default connect(mapStateToProps, actions)(Search)