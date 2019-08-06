import React, { memo, useEffect, useState } from 'react'
import './style.scss'
import { req_category } from './../../../../api/msite'
import { AxiosResponse } from 'axios';
import { Category, createCategory, SubCateGory } from './../../../../models/Category'
import { getImgPath } from './../../../../util/getImgPath'
import * as actions from './../../../../store/actions/msiteAction'
import { connect } from 'react-redux'
import {
  CurrentCate,
} from './../../../../interface/msite'
import {
  CurrentOffset
} from './../../../../interface/Home'

interface IProps {
  show: boolean
  hide(): void
  setHeadList: Function
  setType(index: number): void
  get_resturant: Function,
  lat: number
  lng: number
  support_ids: any
  currentSorType: string 
  activity_types: string
  set_current_offset: (payload: number) => CurrentOffset
  set_current_category: (payload: string) => CurrentCate
}
const MsiteDownModel = memo((props: IProps) => {
  const {
    show,
    hide,
    setHeadList,
    setType,
    lat,
    lng,
    support_ids,
    get_resturant,
    set_current_offset,
    set_current_category,
    activity_types,
    currentSorType
  } = props
  const [categorys, setCate] = useState<Category []>([])
  // 控制左侧样式
  const [currentCate, setCurrentCate] = useState(0)
  const [currentSubCate, setCurrentSubCate] = useState(0)
  // 只有右侧被选中时才设置左侧选中
  const [selectCate, setSelectCate] = useState(0)
  useEffect(() => {
    if (show && !categorys.length) {
      ; (async () => {
        let rs: AxiosResponse = await req_category()
        const { err_code, data } = rs as any
        if (err_code === 0) {
          // 去除第一条
          data.shift()
          setCate(createCategory(data))
        }
      })()
    }
  }, [show])
  const handleClickLeft = (index: number) => {
    setCurrentCate(index)
  }

  // 监听叉号的点击
  const handleHide = () => {
    hide()
  }
  // 监听右侧食物的点击
  const handleSubCateClick = (subCate: number, index: number, name: string) => {
    // 设置选中的左侧
    setSelectCate(subCate)
    // 设置选中的右侧
    setCurrentSubCate(index)
    // 同步头部数据
    let list: SubCateGory[] = categorys[subCate].sub_categories
    setHeadList(list)
    // 设置头部选中
    setType(index)
    hide()
    // 请求数据
    set_current_offset(1)
    set_current_category(encodeURI(name))
    get_resturant(lat, lng, 0, 8, currentSorType, support_ids, activity_types, encodeURI(name))

  }


  return (
    <div className={`msite-downmodel ${show ? '' : 'hiden'}`}>
      <section className="msite-downmodel-header">
        <span className="msite-downmodel-header-left">请选择分类</span>
        <span className="msite-downmodel-header-right">
          <i className="iconfont icon-cuohao" onClick={() => handleHide()}></i>
        </span>
      </section>
      <section className="msite-downmodel-content">
        <div className="msite-downmodel-content-left">
          <ul className="msite-downmodel-content-left-list">
            {categorys.map((cate: Category, index: number) => (
              <li
                className={`msite-downmodel-content-left-item ${currentCate === index ? 'cate_select' : ''}`}
                key={cate.id}
                onClick={() => handleClickLeft(index)}
              >
                <span className={`item-name`}>{cate.name}</span>
                <span className="item-count">{cate.count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="msite-downmodel-content-right">
          <ul className="msite-downmodel-content-right-list">
            {categorys.length > 0 && categorys[currentCate].sub_categories.map((item: SubCateGory, index: number) => {

              return (
                <li
                  className={`msite-downmodel-content-right-item ${currentSubCate === index && currentCate === selectCate ? 'sub_select' : ''}`}
                  key={item.id}
                  onClick={() => handleSubCateClick(currentCate, index, item.name)}
                >
                  <div className="msite-downmodel-content-right-item-left">
                    <p className="msite-downmodel-content-right-item-left-img">
                      <img src={getImgPath(item.image_url)} alt="food" />
                    </p>
                    <span className="msite-downmodel-content-right-item-left-name">{item.name}</span>
                  </div>
                  <p className="msite-downmodel-content-right-item-right">
                    {item.count}
                  </p>
                </li>

              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
})
const mapStateToProps = (state: any) => ({
  lat: state.getIn(['home', 'lat']),
  lng: state.getIn(['home', 'lng']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
  currentOffset: state.getIn(['home', 'currentOffset']),
  currentSorType: state.getIn(['home', 'currentSorType']),
})
export default connect(mapStateToProps, actions)(MsiteDownModel)