import ajax from './../lib/ajax'
export const req_rating = (code: number, offset: number, limit: number) => ajax.request({
  method: 'GET',
  url: '/proxy/rating',
  params: {
    offset, 
    code, 
    limit
  }
})