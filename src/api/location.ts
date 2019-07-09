import ajax from './../lib/ajax'
export const req_citylist = () => ajax.request({
  url: '/address/citylist',
  method: 'GET'
}) 