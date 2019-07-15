import React, { memo, useState } from 'react'
import './choosemodel.scss'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/homeAction'

interface IProps {
  chooseBy: Array<object>,
  set_choose_type: any,
  clear_all_select: any,
  currentSelect: any
}



const DownModel = memo((props: IProps) => {
  const { chooseBy, set_choose_type, clear_all_select, currentSelect } = props
  let [mulSelect, setMulSelect] = useState<number[]>([])
  let clearBtnUerfurl = false
  if (
    currentSelect.get(1) === undefined
    && currentSelect.get(2) === undefined
    && !mulSelect.length
  ) {
    clearBtnUerfurl = false
  } else {
    clearBtnUerfurl = true
  }
  const handleClearBtn = () => {
    if (clearBtnUerfurl) {
      setMulSelect([])
      clear_all_select()
    }
  }
  const handleClick = (index: number, idx: number, flag: boolean) => {
    if (index === 0) {
      if (flag) {
        setMulSelect(mulSelect.concat(idx))
      } else {
        setMulSelect(mulSelect.splice(idx, 1))
      }
    }
    set_choose_type(index, idx, flag)
  }
  return (
    <div className='choose-model'>
      {chooseBy && chooseBy.map((part: any, index: number) => (
        <div className="choose-model-part" key={part.get('id')}>
          <p className="choose-model-title">{part.get('title')}</p>
          <ul className="choose-model-part-list">
            {part.get('data').map((item: any, idx: number) => {
              return (
                <li
                  className={`choose-model-part-item ${item.get('select') ? 'item-selected ' : ''}`}
                  key={item.get('name')}
                  onClick={() => handleClick(index, idx, !item.get('select'))}
                >
                  {
                    item.get('icon')
                      ? <img src={item.get('icon')} className="part-item-icon" alt={item.get('icon')} />
                      : null
                  }
                  <span className="part-item-content">{item.get('name')}</span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <span
        className={`choose-model-clear ${clearBtnUerfurl ? 'clear-useful' : ''}`}
        onClick={handleClearBtn}
      >清空</span>
      <span className="choose-model-ok">确定</span>
    </div>
  )
})

const mapStateToProps = (state: any) => ({
  chooseBy: state.getIn(['home', 'filterNavTab', 'chooseBy']),
  currentSelect: state.getIn(['home', 'currentSelect'])
})

export default connect(mapStateToProps, actions)(DownModel)





