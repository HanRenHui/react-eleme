import React, { memo } from 'react'
import { getImgPath } from './../../../../util/getImgPath'
import './fooditem.scss'
interface IProps {
  food: any,
}
const FoodsItem = memo((props: IProps) => {
  const { food } = props 
  return (
    <li className="settlement-foods-item">
      <span className="settlement-foods-item-left">
        <img src={getImgPath(food.get('image_path'), 10)} alt="" />
        {food.get('name')}
      </span>
      <span className="settlement-foods-item-center">
        ×{food.get('count')}
      </span>
      <span className="settlement-foods-item-right">
        {
          food.getIn(['specfoods', '0', 'original_price'])
            ? (
              <span className="settlement-foods-item-origin">
                ￥{food.getIn(['specfoods', '0', 'original_price'])}
              </span>
            )
            : null
        }
        <span className={`settlement-foods-item-current ${food.getIn(['specfoods', '0', 'original_price']) ? 'hascount' : ''}`}>
          ￥{food.getIn(['specfoods', '0', 'price'])}
        </span>
      </span>
    </li>
  )
})

export default FoodsItem