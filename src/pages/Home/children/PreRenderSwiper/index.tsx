import React, { memo } from 'react'
import './prerenderswiper.scss'
// 骨架屏
const PreRenderSwiper = memo(() => {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="prerender-swiper">
      {arr.map((item: number) => (
        <div className="pre-s-item" key={item}>
          <div className="pre-s-i-top"></div>
          <div className="pre-s-i-bottom"></div>
        </div>
      ))}
    </div>
  )
})
export default PreRenderSwiper