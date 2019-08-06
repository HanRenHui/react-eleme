import React, { memo } from 'react'
import './vip.scss'
const DetailVip = memo(() => {
  return (
    <div className="vip">
      <div className="vip-left">
        <img src="//fuss10.elemecdn.com/4/3b/0e1e3043c614f0baf35f185cfa16dpng.png" alt="麦当劳"/>
        <p>
          <span>麦当劳会员</span>
          <span>领卡即享专属优惠，立省88.5元。</span>
        </p>
      </div>
      <div className="vip-right">立即领卡</div>
    </div>
  )
})

export default DetailVip