import ajax from '../lib/ajax'
const TecentKey = '7Y2BZ-ECQCW-IWVRW-OZS7L-GIGK6-PGFK3'
// 请求城市列表
export const req_citylist = () => ajax.request({
  url: '/home/citylist',
  method: 'GET'
})
// 请求地址定位
export const req_location = (ip: string) => ajax.request({
  method: 'GET',
  url: '/location/get_location',
  params: {
    ip
  }
})
// 获取地址搜索建议
export const req_local_suggestion = (keyword: string, city: string) => ajax.request({
  method: 'GET',
  url: '/location/suggestion',
  params: {
    city,
    keyword
  }
})
// 请求轮播图数据
export const req_swiper_data = () => ajax.request({
  method: 'GET',
  url: '/home/swiper_data'
})
// 请求推荐餐厅
export const req_resturant =
  (
    latitude: number,
    longitude: number,
    offset: number,
    limit: number,
    code: string,
    support_ids: string[],
    activity_types: string
  ) => ajax.request({
    url: '/proxy/restapi/shopping/v3/restaurants',
    method: 'GET',
    params: {
      latitude,
      longitude,
      offset,
      limit: 7,
      code,
      support_ids,
      activity_types
    }
  })


// 请求筛选tab数据
export const req_filter_data = () => ajax.request({
  url: '/home/filter',
  method: 'GET'
})