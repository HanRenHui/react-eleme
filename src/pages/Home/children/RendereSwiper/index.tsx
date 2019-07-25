import React, { memo, useEffect } from 'react'
import './renderswiper.scss'
import Swiper from 'swiper'
import { Immutable } from '@babel/types';
// import 'swiper/dist/css/swiper.min.css'

interface SwiperProps {
  swiperData: Array<Immutable>
}
// 骨架屏对应的内容
const RendereSwiper = memo((props: SwiperProps) => {
  const { swiperData } = props
  let firstPart = swiperData.slice(0, 10)
  let secPart = swiperData.slice(-2)
  useEffect(() => {
    if (swiperData) {
      new Swiper('.swiper-container', {
        autoplay: false,
      });
    }

  }, [swiperData])
  return (
    <div className="swiper-container" >
      <ul className="swiper-wrapper">
        <li className="container-first swiper-slide">
          {firstPart.map((item: any, index: number) => (
            <div className="s-item" key={index}>
              <img src={item.get('src')} className="s-i-top" alt={item.get('src')} />
              <div className="s-i-bottom">{item.get('title')}</div>
            </div>
          ))}
        </li>
        <li className="container-sec swiper-slide">
          {secPart.map((item: any, index: number) => {
            return <div className="s-item" key={index}>
              <img src={item.get('src')} className="s-i-top" alt={item.get('title')} />
              <div className="s-i-bottom">{item.get('title')}</div>
            </div>
          })}
        </li>
      </ul>

    </div>

  )
})
export default RendereSwiper