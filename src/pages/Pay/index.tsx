import React, { useState, useEffect, useRef } from 'react'
import './pay.scss'
import Header from './../../Components/Header'
import { Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { add_order } from './.../../../../api/user'
interface IProps {
  restaurant_name: string,
  history: any,
  buycar: any,
  address: string,
  address_detail: string,
  deliver_fee: number,
  consignee: string,
  description: string, 
  restaurant_address: string,
  restaurant_id: string,
  restaurant_image_hash: string,
  restaurant_phone: string,
  phone: string,
  userId: string
}
const Pay = (props: IProps) => {
  const {
    history,
    buycar,
    restaurant_name,
    address,
    address_detail,
    deliver_fee,
    consignee,
    description,
    restaurant_address,
    restaurant_id,
    restaurant_image_hash,
    restaurant_phone,
    phone,
    userId
  } = props



  const [currentTotal, setcurrentTotal] = useState(0)
  const [min, setMin] = useState<string | number>('15')
  const [second, setSecond] = useState<string | number>('00')
  const [useful, setUseuful] = useState(true)
  const timeRef = useRef({})
  // 计算总价
  useEffect(() => {
    let totalCur = 0
    buycar.forEach((food: any) => {
      let cur = food.getIn(['specfoods', '0', 'price'])
      totalCur += cur * food.get('count')
    })
    setcurrentTotal(totalCur)
  }, [buycar])
  // 倒计时
  useEffect(() => {
    timeRef.current = setInterval(() => {
      if (min == '00' && second == '01') {
        let timer: any = timeRef.current
        clearInterval(timer)
        setUseuful(false)
      }
      let s = Number(second)
      let m = Number(min)
      s--
      if (s < 0) {
        s = 59
        m--
      }
      setMin(m < 10 ? '0' + m : m)
      setSecond(s < 10 ? '0' + s : s)

    }, 1000)
    return () => {
      let timer: any = timeRef.current
      clearInterval(timer)
    }
  }, [second, min])

  const handlePay = async () => {
    if (!useful) return
    const group = buycar.toJS().map((food: any) => {
      return {
        price: food.specfoods[0].price,
        image_hash: food.image_path,
        name: food.name,
        quantity: food.count,
      }
    })
    // 添加订单
    let rs = await add_order(
      address + address_detail,
      deliver_fee,
      group,
      consignee,
      phone,
      description,
      Date.now(),
      restaurant_address,
      restaurant_id,
      restaurant_image_hash,
      restaurant_name, 
      restaurant_phone,
      currentTotal,
      userId
    )
    history.push('/order')
  }

  return (
    <div className="pay">
      <Header title="在线支付" cb={() => history.goBack()} />
      <div className="pay-top-wrapper">
        <section className="pay-time">
          <p className="pay-time-title">支付剩余时间</p>
          <p className="pay-time-rest-time">
            {
              !useful
                ? '订单已超时'
                : `00:${min}:${second}`
            }
          </p>
        </section>
        <section className="pay-shop-info">
          <p className="pay-shop-info-left">{restaurant_name}</p>
          <p className="pay-shop-info-right">￥{currentTotal}</p>
        </section>
      </div>
      <p className="pay-way-title">选择支付方式</p>
      <section className="pay-way">
        <div className="pay-way-wechat">
          <p className="pay-way-wechat-left">
            <i className="iconfont icon-queding"></i>
            <span>微信支付</span>
          </p>
          <p className="pay-way-wechat-right">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABVhJREFUWAm9mV1oXFUQgGfO3aQJBgMFIyRSkWQTf0p9SF4UrFRpEUk2rRAriqQPzaYNDVLbJx/MKogKLYqUkJ+C+lCxJDTJRqtthbZ5Emn1pRbsbixEkthSsdFg1mTvGWeuucvN2d27N+kmF8K558ycOV/mzpnzswhrfHYnorVpoFYkaiSAaiCsRi4JoQSA/kLA22z6OiBctQCHR8MDk2sZim0Gf/YkD1SldfoQA+0Bgq3BewJzwhUE9eUm/htq6JsO2jcQYNvtroqFucUjqPEoAVUENZ5TDyGlSH24ubT6g88eiaVy6ngaCwJGbnS+RGD3EsGDnn73/IqIk6Cge7xu8Bs/YyqfkIiwObG/R4M9XGw4GZPt15JNZ1sS+4/lY5D2nB5s++1weWph/nM20ubXuWgyhYNNdTUHYhjTps0sD4rnNhROiDR1XElMn4pRLGQCZjW0JDve5hm6MZ7z0HC6Sv8Mj3OCWPms8KBMCIbrWamy/jVEGGisf6h9CF+2zdEyMSipJHV3MbkeE8Ic1FtHVB+P1w8c9rZ53zMelDy38XDwnh+cgDoedFYI25685yTs/dcLvCvAt+INg++bavtuxsruLE2fVmWbDsa3nJhxPGhru3vD4JBXbVRv5IJ7/fej9/2xOH2Wk2SEUqkugXcANdBu8z9ZjzqvHprhovxZPzHtv5bovv/Pubnz7KgdIiPAfZLy0NmVaJ00OxS/jmkGbGe4L0zbvDBsTv3z9znOMU1eWciCppBsmbyN6/HOgb7In+qVsfqBEdO+xD/DXWC4baZM27hLyX7OFBSzzl5bQMtqHWsYzIKLTB2qXtLpS7nghIE/95OKhdWBgRDP8YBzQfV50zpvofVivK7/W7NPy2R0C6X+nWCKx0xZpo64VclOONPg88JgQ03hmmaLrF1BIHl1uAuKdo6G+y6ZZiXuKa0nZEdjyoz6A4rjoyCgwDWGa17l3UZ6tKHvh0KQ7Lk7iKHnxsMnvzcGhJab0UdtrSe4/WFTZtb561Zy7PL64fPwYBddOFfND5L1Z5VSz8bDfT+5+m4Z+fXgNliiy0HDiufHIscgzroGcpWE9NSPiVknN3nluSDZ01NolWwfC/df9+rKe2Sys0kvLV3kz1plyvLVhY1XHJrJp+C0E5TxrjrOO52dpp4XkmMuCRY+E6/rzcqprcmOp8nW33H/zaYN3zqzSQz6A4qFQpCKni8pVdvHawemzAEjyegO26bz7LlKU1aoLmx87uh4k3e0xwspO3I5kYEVidf3XwiiH0l2vkBan2G48iD6WToKj6gQ4FiWIF+DjyfNLnwYaiXbHlszHBsUNuWc+BGumQPkrQeAbE527iWNwzxbS/PaKSRgJmHjNONsCrOWId/+PpCRX6LtqO1THLhZ5x1fm4aQ489hcgBDKnRCliVDx7+aA7LlRrRTo/6UM6vl39lfKizCJFoM+v8jh3TQEHPrgcvliUNoP0EaPgrcz09RQeyr8Ml3RMXxoLyUV5Ye51x2S95X9bAnifTXxYITBmFxGTKAQ1W98whWF/vUd+lzO3pL3hbxlVsRHjkOMIOwuNYygNLA+e0MAzqudRU2tOSxHQbPoJkYdNs4b2EkET3N5YbeLsiOKR4e2Mvlii+4woMCKQpl5RXt0sGFXu9SxloecwWcw5NvcPHk8j1ND0dllqfz9VtVu8Q7f1a+I3zX9Jxrp+DA63eBCbdkQpgx54K5ZUFAUSzmFbAkYVJ0TFKJd7a6QGYZCNDtJEdEuYVwDvqrvETnT3mNBxuRFWKkrk9+AQj0rArQazHfzxCiw5E+IxthNj7DdwNXZVey1p8h/gM30j51BxSfeAAAAABJRU5ErkJggg==" alt="" />
          </p>
        </div>
      </section>
      <Button onClick={() => handlePay()} className={`surbtn ${useful ? '' : 'unuseful'}`}>确认支付</Button>

    </div>
  )
}

const mapStateToProps = (state: any) => ({
  buycar: state.getIn(['settlement', 'buycar']),
  restaurant_name: state.getIn(['detail', 'rst', 'name']),
  restaurant_image_hash: state.getIn(['detail', 'rst', 'image_path']),
  restaurant_address: state.getIn(['detail', 'rst', 'address']),
  restaurant_phone: state.getIn(['detail', 'rst', 'phone']),
  restaurant_id: state.getIn(['detail', 'rst', 'id']),
  deliver_fee: state.getIn(['detail', 'rst', 'piecewise_agent_fee', 'rules', '0', 'fee']),
  userId: state.getIn(['user', 'userinfo', '_id']),
  description: state.getIn(['remark', 'remarkInfo']),
  address: state.getIn(['settlement', 'address', 'address']),
  address_detail: state.getIn(['settlement', 'address', 'address_detail']),
  consignee: state.getIn(['settlement', 'address', 'name']),
  phone: state.getIn(['settlement', 'address', 'phone']),
  sex: state.getIn(['settlement', 'address', 'sex']),

})
export default connect(mapStateToProps)(Pay)

// address(pin): "湖南工业大学新校区"
// address_detail(pin): "湖南省株洲市天元区泰山路88号25-108"
// name(pin): "韩仁辉"
// phone(pin): "17336624467"
// sex(pin): 1
// tag(pin): "学校"
