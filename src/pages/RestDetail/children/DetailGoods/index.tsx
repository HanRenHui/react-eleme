import React, { memo, useEffect, useRef, useState } from 'react'
import './goods.scss'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
import { getImgPath } from '../../../../util/getImgPath';
import GoodsMenu from '../OrderGoodsMenu'
interface IProps {
  menu: any,
  leftMark: any,
  setShowFoodDetail: Function,
  setDetailFood: Function
}
const DetailGoods = memo((props: IProps) => {
  const { menu, leftMark, setShowFoodDetail, setDetailFood } = props
  const ScrollLRef = useRef({})
  const ScrollRRef = useRef({})
  const NavRef = useRef(null)
  const [idx, setIdx] = useState(0)
  const [heightArr, setHeightArr] = useState<number[]>([])
  useEffect(() => {
    if (menu.size && !Object.keys(ScrollLRef.current).length) {
      ScrollLRef.current = new BScroll('.goods-nav', {
        scrollY: true,
        click: true,
      })
    }

  }, [menu, NavRef])
  // 监听左侧点击
  const handleLeftClick = (index: number) => {
    let height = heightArr[index]
    let scrollR: any = ScrollRRef.current
    scrollR.scrollTo(0, -height, 300)
  }

  return (
    <div className="order-goods">
      <div className="goods-nav">
        <ul className="goods-nav-list" >
          {menu && menu.map((m: any, index: number) => {
            let category_id = m.get('id')
            console.log(index, leftMark.get(category_id))
            return (
              <li
                key={m.get('id')}
                onClick={() => handleLeftClick(index)}
                className={`goods-nav-item ${idx === index ? 'goods-nav-select' : ''}`}
              >
                {
                  leftMark && leftMark.get(category_id) > 0
                    ? (
                      <span className='goods-nav-tag'>
                        {leftMark.get(category_id)}
                      </span>
                    )
                    : null
                }

                <span className="goods-nav-span">
                  {m.get('icon_url')
                    ? <img src={getImgPath(m.get('icon_url'), 7)} />
                    : null
                  }
                  {m.get('name')}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      {/* 右侧滑动 */}
      <GoodsMenu
        setShowFoodDetail={setShowFoodDetail}
        menu={menu}
        ScrollLRef={ScrollLRef}
        ScrollRRef={ScrollRRef}
        setIdx={setIdx}
        heightArr={heightArr}
        setHeightArr={setHeightArr}
        setDetailFood={setDetailFood}
      />
    </div>
  )
})
const mapStateToProps = (state: any) => ({
  menu: state.getIn(['detail', 'menu']),
  leftMark: state.getIn(['detail', 'leftMark']),

})
export default connect(mapStateToProps, null)(DetailGoods)