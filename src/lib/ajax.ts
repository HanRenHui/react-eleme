import axios from 'axios'
import store from './../store'
import * as actions from './../store/actions/homeAction'
import { AxiosInstance } from 'axios'
class Ajax {
  baseURL: string
  queue: object
  withCredentials: boolean
  whiteSpace: string []
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.106.1:10001/' : '/'
    // this.baseURL = 'https://elm.hanrenhui.cn'
    // this.baseURL = 'http://192.168.0.106:1888'
    this.queue = {}
    this.withCredentials = true
    // 白名单中的url 加载没有loading显示
    this.whiteSpace = [
      '/proxy/restapi/shopping/v1/typeahead',
      '/proxy/detail',
    ]
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
      if (!this.whiteSpace.includes(url)) {
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
    let instance: AxiosInstance = axios.create()
    this.setInterceptors(instance, option.url)
    return instance(config)
  }
}

export default new Ajax() 