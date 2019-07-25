import React, { memo, useState } from 'react'
import { getImgPath } from '../../../../util/getImgPath'
import DetailRecomm from '../DetailRecom'
import DetailGoods from '../DetailGoods'
import { connect } from 'react-redux'
import BuyCar from '../../../../Components/BuyCar'
import DetailUp from './../DetailUp'
import { CSSTransition } from 'react-transition-group'
import './foods.scss'
interface IProps {
  rst: any,
  fee: number,
  price: number,
  menu: any,
  recommend: any,
  seShowMask: Function,
  showMask: boolean
}
const DetailFoods = memo((props: IProps) => {
  const { rst, menu, recommend, price, fee } = props
  // 由于标记是否显示详情页
  const [ showFoodDetail, setShowFoodDetail] = useState(false)
  // 存放详情页要展示的数据
  const [detailFood, setDetailFood] = useState ({})
  // 从全部数据中过滤出选中的数据 放入购物车中
  let foodCar: any[] = []

  for (let i=1; i<menu.size; i++) {
    let item = menu.get(i)
    item.get('foods').forEach((food: any) => {
      if (food.get('count') > 0) {
        foodCar.push(food.toJS())
      }
    })
  }

  // 计算购物车总价

  let originTotal = 0
  let currentTotal = 0
  foodCar.forEach((food: any) => {
    originTotal += food.specfoods[0].original_price * 1000 * food.count / 1000
    currentTotal += food.specfoods[0].price * 1000 * food.count / 1000
  })


  // 计算总共选中的数量
  let totalCount = foodCar.reduce((pre, next) => {
    return pre + next.count
  }, 0)

  return (
    <div className="detail-foods">
      {
        rst.getIn(['posters', '0'])
          ? <img className='foods-ads' src={getImgPath(rst.getIn(['posters', '0', 'image_hash']), 5)} />
          : null
      }
      <DetailRecomm setShowFoodDetail={setShowFoodDetail} setDetailFood={setDetailFood}/>
      <DetailGoods setShowFoodDetail={setShowFoodDetail} setDetailFood={setDetailFood}/>
      {/* 底部购物车 */}
      <BuyCar
        foodCar={foodCar}
        totalCount={totalCount}
        currentTotal={currentTotal}
        originTotal={originTotal}
        fee={fee}
        price={price}
      />
      <CSSTransition timeout={200} classNames="detail" in={showFoodDetail}>
        <DetailUp setShowFoodDetail={setShowFoodDetail} detailFood={detailFood}/>
      </CSSTransition>
  
    </div>
  )
})
const mapStateToProps = (state: any) => ({
  rst: state.getIn(['detail', 'rst']),
  fee: state.getIn(['detail', 'rst', 'piecewise_agent_fee', 'rules', '0', 'fee']),
  price: state.getIn(['detail', 'rst', 'piecewise_agent_fee', 'rules', '0', 'price']),
  menu: state.getIn(['detail', 'menu']),
  recommend: state.getIn(['detail', 'recommend']),
})
export default connect(mapStateToProps, null)(DetailFoods)