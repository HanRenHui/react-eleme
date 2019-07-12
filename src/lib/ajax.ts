import axios from 'axios'
import store from './../store'
import * as actions from './../store/actions/homeAction'
class Ajax {
  baseURL: string
  timeout: number 
  queue: object
  withCredentials: boolean
  constructor() {
    this.baseURL = 'http://localhost:1888' 
    this.timeout = 3000 
    this.queue = {}
    this.withCredentials = true
  }
  mergeConfig(option: object) {
    return {
      baseURL: this.baseURL,  
      timeout: this.timeout, 
      withCredentials: this.withCredentials,
      ...option
    }
  }
  setInterceptors(instance: any, url: string) {
    instance.interceptors.request.use((config: any) => {
      (this.queue as any)[url] = true
      store.dispatch(actions.show_loading())
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