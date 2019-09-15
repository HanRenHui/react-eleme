import React, { memo, useEffect } from 'react'
import './backmask.scss'

interface IProps {
  show: boolean,
  hide(): void,
}

const BlackMask = memo((props: IProps) => {
  const { show, hide } = props
  useEffect(() => {
    if (show) {
      document.body.classList.add('body-prevent-scroll')
    } else {
      document.body.classList.remove('body-prevent-scroll')
    }
  }, [show])
  return (
    <div
      className={`blackmask ${show ? '' : 'hiden'}`}
      onClick={hide}
    ></div>
  )
})

export default BlackMask