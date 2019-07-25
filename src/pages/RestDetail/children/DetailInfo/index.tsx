import React from 'react'
import './detailinfo.scss'
const DetailInfo = () => {
  return (
    <div className="detail-info">
      <section className="info-run">
        <h3>配送信息</h3>
        <p>由商家配送提供配送，约28分钟送达，距离3.1km</p>
        <p>配送费￥9</p>
      </section>
      <section className="info-run">
        <h3>商家服务</h3>
        <p><span className="ticket">票</span> 该商家支持开发票，请在下单时填写好发票抬头</p>
      </section>
      <section className="info-run">
        <h3>商家信息</h3>
        <ul>
          <li>
            <span>品类</span>
            <span>汉堡薯条, 炸鸡炸串</span>
          </li>
          <li>
            <span>商家电话</span>
            <span>4000517117</span>
          </li>
          <li>
            <span>地址</span>
            <span>上海市松江区新松江路927弄二层2001A室</span>
          </li>
          <li>
            <span>营业时间</span>
            <span>00:00-02:00,07:00-10:15,10:30-23:55</span>
          </li>
        </ul>
      </section>
      
    </div>
  )
}

export default DetailInfo