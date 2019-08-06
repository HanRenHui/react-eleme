import React, { memo, useEffect, useRef, useState } from 'react'
import './goodsmenu.scss'
import BScroll from 'better-scroll'
import { getImgPath } from '../../../../util/getImgPath';
import BuyCount from '../../../../Components/BuyCount'

interface IProps {
  heightArr: number[],
  menu: any,
  ScrollLRef: any,
  ScrollRRef: any,
  setIdx: any,
  setHeightArr: any,
  setShowFoodDetail: any,
  setDetailFood: Function
}
const GoodsMenu = memo((props: IProps) => {
  const { menu, setIdx, setShowFoodDetail, setDetailFood } = props
  const { ScrollRRef, heightArr, setHeightArr } = props
  const hookRef = useRef(null)
  // 绑定滚动
  useEffect(() => {
    if (menu.size && !Object.keys(ScrollRRef.current).length) {

      ScrollRRef.current = new BScroll('.goods-menu', {
        scrollY: true,
        click: true,
        probeType: 3
      })
    }

  }, [menu, ScrollRRef.current])
  useEffect(() => {
    if (Object.keys(ScrollRRef.current).length) {
      ScrollRRef.current.refresh()
    }
  }, [menu])
  // 获取高度
  useEffect(() => {
    if (menu.size && !heightArr.length && hookRef.current) {
      let height = 0
      let arr = [height]
      ;[...(hookRef.current as any).children].forEach((c: any) => {
        height += c.offsetHeight
        arr.push(height)
      })
      setHeightArr(arr)
    }
  }, [menu, hookRef])
  // 根据滚动 来判断那个左侧的高亮
  useEffect(() => {
    if (Object.keys(ScrollRRef.current).length) {
      ScrollRRef.current.on('scroll', (pos: { x: number, y: number }) => {
        const { y } = pos
        let posY = Math.abs(y)
        heightArr.forEach((h: number, index: number) => {
          if (posY >= h && posY < heightArr[index + 1]) {
            setIdx(index)
          }
        })

      })
    }
  }, [ScrollRRef.current])
  return (
    <div className="goods-menu">
      <div className="goods-menu-content" ref={hookRef}>
        {menu && menu.map((section: any, part: number) => {
          return (
            <div className="goods-menu-section" key={section.get('id')}>
              <p className="menu-s-title">
                <span className="menu-s-t-name">{section.get('name')}</span>
                <span className="menu-s-t-des">{section.get('description')}</span>
              </p>
              <ul className="menu-s-foods-list">
                {section.get('foods').map((food: any, idx: number) => {
                  let currentPrice = food.getIn(['specfoods', '0', 'price'])
                  let originPrice = food.getIn(['specfoods', '0', 'original_price'])
                  let discount = (((currentPrice / originPrice) as any) * 10).toFixed(1)
                  return (
                    <li className="menu-s-foods-item" key={food.get('item_id')} >
                      <img
                        src={getImgPath(food.getIn(['photos', '0']), 6)}
                        className="menu-s-foods-item-left" alt=""
                        onClick={() => { setShowFoodDetail(true); setDetailFood(food.toJS()) }}
                      />
                      <div className="menu-s-foods-item-right">
                        <h3 className="menu-s-foods-i-r-name">
                          {food.get('name')}
                        </h3>
                        <p className="menu-s-foods-i-r-des">
                          {food.get('description')}
                        </p>
                        <p className="menu-s-foods-i-r-info">
                          <span className="menu-s-foods-i-r-info-month">月售{food.get('month_sales')}份</span>
                          <span className="menu-s-foods-i-r-info-rating">好评率{food.get('satisfy_rate')}%</span>
                        </p>
                        {/* 折扣 */}
                        {
                          originPrice
                            ? (
                              <p className="menu-s-foods-i-r-discount">
                                {discount}折
                              </p>
                            )
                            : null
                        }

                        <div className="menu-s-foods-i-r-bottom">
                          <span className="menu-s-foods-i-r-bottom-left">
                            <span className="menu-s-foods-i-r-bottom-left-price">￥{currentPrice}</span>
                            {
                              originPrice
                                ? <span className="menu-s-foods-i-r-bottom-left-origin">￥{originPrice}</span>
                                : null
                            }
                          </span>
                          <BuyCount food={food} />
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>


    </div>
  )
})

export default GoodsMenu