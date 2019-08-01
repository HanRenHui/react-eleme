import React, { useState } from 'react'
import './remark.scss'
import Header from './../../../../Components/Header'
import { connect } from 'react-redux'
import * as actions from './../../../../store/actions/RemarkActions'
interface IProps {
  history: any,
  mutiData: any,
  singleData: any,
  setRemarkMulData: Function,
  setRemarkSingleData: Function,
  setRemarkText: Function
}

const Remark = (props: IProps) => {
  const {
    history,
    mutiData,
    singleData,
    setRemarkMulData,
    setRemarkSingleData,
    setRemarkText
  } = props
  const [text, setText] = useState('')
  const handleSure = () => {
    setRemarkText(text)
    history.goBack()
  }
  return (
    <div className="ramark">
      <Header title="订单备注" cb={() => history.goBack()} />
      <section className="remark-wrapper">
        <textarea maxLength={100} placeholder="填写额外对餐厅和骑手小哥备注的信息" onChange={(e: any) => setText(e.target.value)}></textarea>
        <div className="data-wrapper">
          <ul className="remark-muti-data">
            {singleData.map((data: any, index: number) => (
              <li
                className={`remark-muti-item ${data.get('select') ? 'select' : ''}`}
                key={data.get('title')}
                onClick={() => setRemarkSingleData(index)}
              >
                {data.get('title')}
              </li>
            ))}
          </ul>
          {mutiData.map((data: any, index: number) => (
            <div
              key={data.get('title')}
              className={`remark-single-item ${data.get('select') ? 'select' : ''}`}
              onClick={() => setRemarkMulData(index)}
            >
              {data.get('title')}
            </div>
          ))}
        </div>


      </section>
      <button className="surbtn" onClick={() => handleSure()}>确定</button>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  mutiData: state.getIn(['remark', 'mutiData']),
  singleData: state.getIn(['remark', 'singleData']),
})
export default connect(mapStateToProps, actions)(Remark)