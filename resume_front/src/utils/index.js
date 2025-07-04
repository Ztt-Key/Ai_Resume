import Taro from '@tarojs/taro'

/**
 * 登录相关工具函数
 */
export const authUtils = {
  /**
   * 检查登录状态
   */
  checkLogin: () => {
    const token = Taro.getStorageSync('token')
    const userInfo = Taro.getStorageSync('userInfo')
    return !!(token && userInfo)
  },

  /**
   * 获取用户token
   */
  getToken: () => {
    return Taro.getStorageSync('token')
  },

  /**
   * 获取用户信息
   */
  getUserInfo: () => {
    return Taro.getStorageSync('userInfo')
  },

  /**
   * 设置用户信息
   */
  setUserInfo: (userInfo) => {
    Taro.setStorageSync('userInfo', userInfo)
  },

  /**
   * 设置token
   */
  setToken: (token) => {
    Taro.setStorageSync('token', token)
  },

  /**
   * 清除登录信息
   */
  clearLoginInfo: () => {
    Taro.removeStorageSync('token')
    Taro.removeStorageSync('userInfo')
  },

  /**
   * 跳转到登录页
   */
  redirectToLogin: () => {
    Taro.reLaunch({
      url: '/pages/index/index'
    })
  }
}

/**
 * 验证相关工具函数
 */
export const validateUtils = {
  /**
   * 验证手机号格式
   */
  validatePhone: (phone) => {
    return /^1[3-9]\d{9}$/.test(phone)
  },

  /**
   * 验证验证码格式
   */
  validateVerifyCode: (code) => {
    return /^\d{6}$/.test(code)
  },

  /**
   * 验证邮箱格式
   */
  validateEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },

  /**
   * 验证密码强度
   * @param {string} password 密码
   * @returns {object} 验证结果
   */
  validatePassword: (password) => {
    const result = {
      isValid: false,
      score: 0,
      messages: []
    }

    if (!password) {
      result.messages.push('密码不能为空')
      return result
    }

    if (password.length < 6) {
      result.messages.push('密码长度至少6位')
    } else {
      result.score += 20
    }

    if (password.length >= 8) {
      result.score += 10
    }

    if (/[a-z]/.test(password)) {
      result.score += 20
    }

    if (/[A-Z]/.test(password)) {
      result.score += 20
    }

    if (/\d/.test(password)) {
      result.score += 20
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      result.score += 10
    }

    result.isValid = result.score >= 40 && password.length >= 6

    if (result.score < 40) {
      result.messages.push('密码强度太弱，建议包含大小写字母、数字和特殊字符')
    }

    return result
  },

  /**
   * 验证身份证号
   */
  validateIdCard: (idCard) => {
    return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idCard)
  }
}

/**
 * 格式化工具函数
 */
export const formatUtils = {
  /**
   * 格式化手机号
   */
  formatPhone: (phone) => {
    if (!phone) return ''
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
  },

  /**
   * 格式化文件大小
   */
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  /**
   * 格式化时间
   */
  formatTime: (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds)
  },

  /**
   * 格式化相对时间
   */
  formatRelativeTime: (timestamp) => {
    const now = Date.now()
    const diff = now - timestamp
    const minute = 60 * 1000
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const year = day * 365

    if (diff < minute) {
      return '刚刚'
    } else if (diff < hour) {
      return Math.floor(diff / minute) + '分钟前'
    } else if (diff < day) {
      return Math.floor(diff / hour) + '小时前'
    } else if (diff < month) {
      return Math.floor(diff / day) + '天前'
    } else if (diff < year) {
      return Math.floor(diff / month) + '个月前'
    } else {
      return Math.floor(diff / year) + '年前'
    }
  },

  /**
   * 格式化金额
   */
  formatMoney: (amount, currency = '¥') => {
    if (isNaN(amount)) return currency + '0.00'
    return currency + parseFloat(amount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  }
}

/**
 * 设备相关工具函数
 */
export const deviceUtils = {
  /**
   * 获取系统信息
   */
  getSystemInfo: () => {
    return Taro.getSystemInfoSync()
  },

  /**
   * 判断是否为iOS
   */
  isIOS: () => {
    const systemInfo = Taro.getSystemInfoSync()
    return systemInfo.platform === 'ios'
  },

  /**
   * 判断是否为Android
   */
  isAndroid: () => {
    const systemInfo = Taro.getSystemInfoSync()
    return systemInfo.platform === 'android'
  },

  /**
   * 判断是否为微信小程序
   */
  isWeapp: () => {
    return process.env.TARO_ENV === 'weapp'
  },

  /**
   * 判断是否为H5
   */
  isH5: () => {
    return process.env.TARO_ENV === 'h5'
  },

  /**
   * 获取网络类型
   */
  getNetworkType: async () => {
    try {
      const res = await Taro.getNetworkType()
      return res.networkType
    } catch (error) {
      console.error('获取网络类型失败:', error)
      return 'unknown'
    }
  }
}

/**
 * 存储相关工具函数
 */
export const storageUtils = {
  /**
   * 设置存储（带过期时间）
   */
  setStorage: (key, value, expireTime = null) => {
    const data = {
      value,
      expireTime: expireTime ? Date.now() + expireTime : null
    }
    Taro.setStorageSync(key, JSON.stringify(data))
  },

  /**
   * 获取存储（检查过期时间）
   */
  getStorage: (key) => {
    try {
      const dataStr = Taro.getStorageSync(key)
      if (!dataStr) return null

      const data = JSON.parse(dataStr)
      if (data.expireTime && Date.now() > data.expireTime) {
        Taro.removeStorageSync(key)
        return null
      }
      return data.value
    } catch (error) {
      console.error('获取存储失败:', error)
      return null
    }
  },

  /**
   * 移除存储
   */
  removeStorage: (key) => {
    Taro.removeStorageSync(key)
  },

  /**
   * 清空所有存储
   */
  clearStorage: () => {
    Taro.clearStorageSync()
  }
}

// 兼容旧的导出方式
export const utils = {
  ...authUtils,
  ...validateUtils,
  ...formatUtils,
  ...deviceUtils,
  ...storageUtils
}

export default utils 