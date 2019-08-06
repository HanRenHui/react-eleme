import ajax from '../lib/ajax'

export const req_sift_factors = () => ajax.request({
  method: 'GET',
  url: '/msite/sift_factors'
})

export const req_category = () => ajax.request({
  method: 'GET', 
  url: '/msite/get_category'
})