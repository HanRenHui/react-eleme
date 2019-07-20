import React, { memo } from 'react'
import './activity.scss'
interface IProps {
  restList: any
}

const Activity = memo((props: IProps) => {
  const { restList } = props 
  return (
    <section className="rest-list-right-acti">
      {restList.get('activities').map((item: any, idx: number) => {
        const style = { background: '#' + item.get('icon_color') }
        return (
          <div key={idx} className="rest-list-right-act-item">
            <span style={style} className="rest-l-right-act-icon-name">{item.get('icon_name')}</span>
            <span className="rest-l-right-act-icon-des">{item.get('description')}</span>
          </div>
        )
      }
      )}
      
    </section>
  )
})

export default Activity