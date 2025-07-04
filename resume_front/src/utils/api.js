import Taro from '@tarojs/taro'

/**
 * API基础配置
 */
const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api/v1', // 根据您的后端地址修改
  TIMEOUT: 10000, // 请求超时时间（毫秒）
  RETRY_TIMES: 3, // 重试次数
}

/**
 * HTTP状态码映射
 */
const HTTP_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

/**
 * 业务状态码映射
 */
const BUSINESS_CODE = {
  SUCCESS: 200,
  FAIL: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
}

/**
 * 请求拦截器 - 处理请求前的逻辑
 */
const requestInterceptor = (options) => {
  const { url, method = 'GET', data, header = {} } = options
  
  // 添加认证token
  const token = Taro.getStorageSync('token')
  if (token) {
    header.Authorization = `Bearer ${token}`
  }
  
  // 设置默认请求头
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  
  return {
    url: `${API_CONFIG.BASE_URL}${url}`,
    method: method.toUpperCase(),
    data,
    timeout: API_CONFIG.TIMEOUT,
    header: {
      ...defaultHeaders,
      ...header
    }
  }
}

/**
 * 响应拦截器 - 处理响应数据
 */
const responseInterceptor = (response) => {
  const { statusCode, data } = response
  
  // HTTP状态码检查
  if (statusCode >= 200 && statusCode < 300) {
    // 业务状态码检查
    if (data && typeof data === 'object') {
      if (data.code === BUSINESS_CODE.SUCCESS) {
        return data
      } else {
        throw new APIError(data.message || '请求失败', data.code, data)
      }
    }
    return data
  } else {
    throw new APIError(`HTTP请求失败: ${statusCode}`, statusCode, response)
  }
}

/**
 * 错误处理器
 */
const errorHandler = (error) => {
  console.error('API请求错误:', error)
  
  // 网络错误处理
  if (error.errMsg) {
    if (error.errMsg.includes('timeout')) {
      throw new APIError('请求超时，请检查网络连接', 'TIMEOUT')
    } else if (error.errMsg.includes('fail')) {
      throw new APIError('网络连接失败，请检查网络设置', 'NETWORK_ERROR')
    }
  }
  
  // 如果已经是APIError，直接抛出
  if (error instanceof APIError) {
    throw error
  }
  
  // 其他未知错误
  throw new APIError(error.message || '未知错误', 'UNKNOWN_ERROR', error)
}

/**
 * 自定义API错误类
 */
class APIError extends Error {
  constructor(message, code, data = null) {
    super(message)
    this.name = 'APIError'
    this.code = code
    this.data = data
  }
}

/**
 * 基础HTTP请求方法
 */
const request = async (options) => {
  try {
    // 请求拦截
    const requestOptions = requestInterceptor(options)
    
    // 发送请求
    const response = await Taro.request(requestOptions)
    
    // 响应拦截
    return responseInterceptor(response)
  } catch (error) {
    return errorHandler(error)
  }
}

/**
 * GET请求
 */
const get = (url, params = {}, options = {}) => {
  const queryString = Object.keys(params).length > 0
    ? '?' + Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&')
    : ''
  
  return request({
    url: url + queryString,
    method: 'GET',
    ...options
  })
}

/**
 * POST请求
 */
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

/**
 * PUT请求
 */
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

/**
 * DELETE请求
 */
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

/**
 * PATCH请求
 */
const patch = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PATCH',
    data,
    ...options
  })
}

/**
 * 文件上传
 */
const upload = (url, filePath, options = {}) => {
  const {
    name = 'file',
    formData = {},
    header = {}
  } = options
  
  const token = Taro.getStorageSync('token')
  if (token) {
    header.Authorization = `Bearer ${token}`
  }
  
  return Taro.uploadFile({
    url: `${API_CONFIG.BASE_URL}${url}`,
    filePath,
    name,
    formData,
    header,
    timeout: API_CONFIG.TIMEOUT
  }).then(response => {
    try {
      const data = JSON.parse(response.data)
      if (data.code === BUSINESS_CODE.SUCCESS) {
        return data
      } else {
        throw new APIError(data.message || '上传失败', data.code, data)
      }
    } catch (parseError) {
      if (parseError instanceof APIError) {
        throw parseError
      }
      throw new APIError('响应数据解析失败', 'PARSE_ERROR', response.data)
    }
  }).catch(error => {
    return errorHandler(error)
  })
}

/**
 * 文件下载
 */
const download = (url, options = {}) => {
  const token = Taro.getStorageSync('token')
  const header = {
    ...options.header
  }
  
  if (token) {
    header.Authorization = `Bearer ${token}`
  }
  
  return Taro.downloadFile({
    url: `${API_CONFIG.BASE_URL}${url}`,
    header,
    timeout: API_CONFIG.TIMEOUT,
    ...options
  }).catch(error => {
    return errorHandler(error)
  })
}

/**
 * 设置API基础URL
 */
const setBaseURL = (baseURL) => {
  API_CONFIG.BASE_URL = baseURL
}

/**
 * 设置请求超时时间
 */
const setTimeout = (timeout) => {
  API_CONFIG.TIMEOUT = timeout
}

/**
 * 获取当前配置
 */
const getConfig = () => {
  return { ...API_CONFIG }
}

// 导出API实例
export const api = {
  // 基础请求方法
  request,
  get,
  post,
  put,
  delete: del,
  patch,
  
  // 文件操作
  upload,
  download,
  
  // 配置方法
  setBaseURL,
  setTimeout,
  getConfig,
  
  // 错误类
  APIError,
  
  // 状态码常量
  HTTP_STATUS,
  BUSINESS_CODE
}

// 默认导出
export default api 