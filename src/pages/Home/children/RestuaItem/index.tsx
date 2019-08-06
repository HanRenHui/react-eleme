import React, { memo, useState } from 'react'
import './restuaitem.scss'
import { getImgPath } from '../../../../util/getImgPath'
import RestRating from './children/RestRating'
import Activity from './children/Activity'
import Rule from './children/Rule'
import Tags from './children/Tags'
interface IProps {
  restList: any
  allPath: string
  isBrand?: boolean
  distance: string
  isNew?: boolean 
  foods?: any
  history: any
}
const RestuaItem = memo((props: IProps) => {
  const {
    restList,
    allPath,
    isBrand,
    distance,
    foods,
    history,
    isNew
  } = props
  const [show, setShow] = useState(false)
  let foodArr = foods && foods.map((food: any, index: number) => {
    if (index < 3) {
      return (
        <li key={food.get('food_id')} className="rest-list-right-foods-item-big">
          <img src={getImgPath(food.get('image_path'), 2)} alt={food.get('name')} />
          <p className="rest-list-right-foods-item-big-name">{food.get('name')}</p>
          <span className="rest-list-right-foods-item-big-price">￥{food.get('price')}</span>
        </li>

      )
    } else {
      return null
    }
  })
  let foodArr2 = foods && foods.map((food: any, index: number) => {
    if (index > 2) {
      return (
        <div
          className={`rest-list-right-foods-item-small ${show ? '' : 'list-hide'}`}
          key={food.get('id')}
        >
          <p className="rest-list-right-foods-item-small-left">
            <span className="rest-list-right-foods-item-small-left-name">
              {food.get('name')}
            </span>
            <span className="rest-list-right-foods-item-small-left-price">
              ￥{food.get('price')}
            </span>
          </p>
          <p className="rest-list-right-foods-item-small-right">
            月售{food.get('month_sales')}
          </p>
        </div>


      )
    } else {
      return null
    }
  }) || null

  return (
    <li key={restList.get('name')} className="rest-list-li" >
      <div className="rest-list-left">
        <img src={allPath} alt="" />
        {
          isNew 
          ? <div className="new"><span>新店</span> </div>
          : null 
        }
        
      </div>
      <div className='rest-list-right'>
        {/* 餐厅名字 */}
        <h4>
          <span className='list-right-name'>
            {
              isBrand
                ? <i className='isbrand'>品牌</i>
                : null
            }
            {restList.get('name')}
          </span>
          <i className="iconfont icon-icon_more" onClick={() => history.push('/detail/123/foods')}></i>
        </h4>
        {/* 餐厅评价 */}
        <RestRating restList={restList} />
        {/* 餐厅起送规则 */}
        <Rule restList={restList} distance={distance} />
        {/* support_tags */}
        <Tags restList={restList} />
        {/* 商家活动 */}
        <Activity restList={restList} />
        <ul className="rest-list-right-foods">{foodArr}</ul>
        <div className="rest-list-right-foods-sm">
          {foodArr2}
          {
            foods  && foods.size - 3 > 0
              ? (
                <p className="control-btn" key="controlbtn" onClick={() => setShow(!show)}>
                  {
                    show
                      ? <span>收起<i className="iconfont icon-shangjiantou"></i></span>
                      : <span>查看其他相关商品 {foods.size - 3} 个<i className="iconfont icon-xiajiantou1"></i></span>
                  }
                </p>
              )
              : null 
          }

        </div>
          
      </div>
    </li>
  )
})

export default RestuaItem 