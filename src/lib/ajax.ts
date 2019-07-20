import axios from 'axios'
import store from './../store'
import * as actions from './../store/actions/homeAction'
class Ajax {
  baseURL: string
  queue: object
  withCredentials: boolean
  constructor() {
    this.baseURL = 'http://localhost:1888'
    this.queue = {}
    this.withCredentials = true
  }
  mergeConfig(option: object) {
    return {
      baseURL: this.baseURL,
      withCredentials: this.withCredentials,
      ...option
    }
  }
  setInterceptors(instance: any, url: string) {
    instance.interceptors.request.use((config: any) => {
      if (url !== '/proxy/restapi/shopping/v1/typeahead') {
        (this.queue as any)[url] = true
        store.dispatch(actions.show_loading())
      }

      return config
    })
    instance.interceptors.response.use((res: any) => {
      delete (this.queue as any)[url]
      if (!Object.keys(this.queue).length) {
        store.dispatch(actions.hide_loading())
      }
      return res.data
    })

  }
  request(option: any) {
    let config = this.mergeConfig(option)
    let instance = axios.create()
    this.setInterceptors(instance, option.url)
    return instance(config)
  }
}

export default new Ajax() 