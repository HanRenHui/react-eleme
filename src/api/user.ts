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
export const get_address = (userId: string) => ajax.request({
  url: '/user/get_address',
  method: 'GET',
  params: {
    userId
  }
})

export const add_address = (userId: string, address: any) => ajax.request({
  method: 'POST',
  data: {
    address,
    userId
  },
  url: '/user/add_address'
})

export const remove_address = (userId: string, address_id: string) => ajax.request({
  method: 'DELETE',
  data: {
    userId,
    address_id
  },
  url: '/user/remove_address'
})

export const upda_address = (userId: string, address_id: string, newAddress: any) => ajax.request({
  method: 'PUT', 
  data: {
    newAddress
  },
  url: `/user/update_address/${userId}/${address_id}`
})