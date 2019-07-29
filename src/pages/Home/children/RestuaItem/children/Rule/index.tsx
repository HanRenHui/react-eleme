import React, { memo } from 'react'
import './rule.scss'
interface IProps {
  restList: any,
  distance: any
}

const Rule = memo((props: IProps) => {
  const { restList, distance } = props
  return (
    <div className='rest-list-right-rules'>
      <p className="rest-l-r-r-left">
        <span className="l-r-r-left-qs-fee">￥{restList.get('price')}起送</span>
        <span className="l-r-r-left-agent-fee">{restList.getIn(['piecewise_agent_fee', 'tips'])}</span>
      </p>
      <p className="rest-l-r-r-right">
        <span className="rest-l-r-r-distance">
          {distance}m
      </span>
        <span className='rest-l-r-r-order-time'>
          {restList.get('order_lead_time')}分钟
      </span>
      </p>
    </div>
  )
})
export default Rule 