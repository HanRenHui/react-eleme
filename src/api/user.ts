import ajax from './../lib/ajax'

export const req_sms_code = (phone: string) => ajax.request({
  method: 'POST',
  data: {
    phone,
  },
  url: '/user/sms_send',
})


export const req_login = (phone: string, code: string) => ajax.request({
  method: 'POST',
  data: {
    phone, 
    code
  },
  url: '/user/login'
})


export const edit_name = (newName: string, id: string) => ajax.request({
  method: 'PUT',
  data: {
    name: newName
  },
  url: `/user/editname/${id}`
})