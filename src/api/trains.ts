import ajax from './../lib/ajax'
export const req_train_info = () => ajax.request({
  method: 'GET',
  url: '/query'
})