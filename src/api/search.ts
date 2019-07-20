import ajax from './../lib/ajax'
// 获取热门搜索
export const req_hot_search = (latitude: number, longitude: number) => ajax.request({
  method: 'GET', 
  params: {
    latitude,
    longitude
  },
  url: '/proxy/restapi/swarm/v2/hot_search_words'
})
// 获取搜索联想关键词
export const req_hot_search_wd = (latitude: number, longitude: number, kw: string) => ajax.request({
  method: 'GET', 
  params: {
    latitude,
    longitude,
    kw
  },
  url: '/proxy/restapi/shopping/v1/typeahead'
})
// 获取搜索结果
export const req_search_result = (offset: number, keyword: string, latitude: number, longitude: number ) => ajax.request({
  method: 'GET',
  params: {
    limit: 7, 
    offset,
    keyword, 
    latitude, 
    longitude
  },
  url: '/proxy/restapi/shopping/v2/restaurants/search'
})