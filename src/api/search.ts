import ajax from './../lib/ajax'
export const req_hot_search = (latitude: number, longitude: number) => ajax.request({
  method: 'GET', 
  params: {
    latitude,
    longitude
  },
  url: '/proxy/restapi/swarm/v2/hot_search_words'
})