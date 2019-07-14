import ajax from '../lib/ajax'
export const req_citylist = () => ajax.request({
  url: '/home/citylist',
  method: 'GET'
}) 
export const req_swiper_data = () => ajax.request({
  method: 'GET',
  url: '/home/swiper_data'
})
// 请求推荐餐厅
export const req_resturant = (latitude: number, longitude: number, offset: number, limit: number ) => ajax.request({
  url: '/proxy/restapi/shopping/v3/restaurants',
  method: 'GET',
  params: {
    latitude, 
    longitude,
    offset,
    limit
  }
})

// 请求筛选tab数据
export const req_filter_data = () => ajax.request({
  url: '/home/filter',
  method: 'GET'
})