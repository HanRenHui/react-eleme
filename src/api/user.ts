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
    code,
  },
  url: '/user/login',
})