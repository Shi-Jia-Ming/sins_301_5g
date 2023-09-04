import axios from 'axios'
import { Message } from 'element-ui'

//解决跨域cookie
axios.defaults.withCredentials = true;

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://222.194.7.2:9999/equipment/',
  // baseURL: 'http://127.0.0.1:9999/equipment',
  timeout: 100000
})
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    const { msg } = res
    if( res.code === 200 ){
      return res
    }else{
      Message({
        message: msg,
        type: 'error',
        duration: 5000
      })
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
