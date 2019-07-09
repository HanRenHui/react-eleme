import axios from 'axios'

interface IOption {
  url: string,
  method: string
}


class Ajax {
  baseURL: string
  timeout: number 
  queue: object
  constructor() {
    this.baseURL = 'http://localhost:1888' 
    this.timeout = 3000 
    this.queue = {}
  }
  mergeConfig(option: object) {
    return {
      baseURL: this.baseURL,  
      timeout: this.timeout, 
      ...option
    }
  }
  setInterceptors(instance: any, url: string) {
    instance.interceptors.request.use((config: any) => {
      // this.queue[url] = true
      return config 
    })
    instance.interceptors.response.use((res: any) => {
      // delete this.queue[url]
      return res.data 
    })
    
  }
  request(option: IOption) {
    let config = this.mergeConfig(option)
    let instance = axios.create() 
    this.setInterceptors(instance, option.url)
    return instance(config)
  }
}

export default new Ajax() 