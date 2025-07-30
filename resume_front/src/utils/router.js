import Taro from '@tarojs/taro'

/**
 * 路由工具类
 * 提供统一的页面跳转方法和路由管理
 */

// 路由路径常量
export const ROUTES = {
  // 登录页
  LOGIN: '/pages/index/index',
  // 主页
  HOME: '/pages/home/index',
  // 创建简历
  CREATE_RESUME: '/pages/createresume/index',

}

/**
 * 路由跳转方法封装
 */
export const Router = {
  /**
   * 保留当前页面，跳转到应用内的某个页面
   * 使用 Taro.navigateBack 可以返回到原页面
   * @param {string} url 页面路径
   * @param {object} params 页面参数
   */
  navigateTo: (url, params = {}) => {
    const queryString = Object.keys(params).length > 0 
      ? '?' + Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
      : ''
    
    return Taro.navigateTo({
      url: url + queryString
    }).catch(error => {
      console.error('页面跳转失败:', error)
      Taro.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    })
  },

  /**
   * 关闭当前页面，跳转到应用内的某个页面
   * @param {string} url 页面路径
   * @param {object} params 页面参数
   */
  redirectTo: (url, params = {}) => {
    const queryString = Object.keys(params).length > 0 
      ? '?' + Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
      : ''
    
    return Taro.redirectTo({
      url: url + queryString
    }).catch(error => {
      console.error('页面重定向失败:', error)
      Taro.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    })
  },

  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param {string} url 页面路径
   * @param {object} params 页面参数
   */
  reLaunch: (url, params = {}) => {
    const queryString = Object.keys(params).length > 0 
      ? '?' + Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
      : ''
    
    return Taro.reLaunch({
      url: url + queryString
    }).catch(error => {
      console.error('页面重启失败:', error)
      Taro.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    })
  },

  /**
   * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
   * @param {string} url tabBar页面路径
   */
  switchTab: (url) => {
    return Taro.switchTab({
      url
    }).catch(error => {
      console.error('切换Tab失败:', error)
      Taro.showToast({
        title: '页面跳转失败',
        icon: 'none'
      })
    })
  },

  /**
   * 关闭当前页面，返回上一页面或多级页面
   * @param {number} delta 返回的页面数，默认为 1
   */
  navigateBack: (delta = 1) => {
    return Taro.navigateBack({
      delta
    }).catch(error => {
      console.error('页面返回失败:', error)
      // 如果返回失败，尝试跳转到首页
      Router.reLaunch(ROUTES.HOME)
    })
  },

  /**
   * 获取当前页面栈
   */
  getCurrentPages: () => {
    return Taro.getCurrentPages()
  },

  /**
   * 获取当前页面路径
   */
  getCurrentRoute: () => {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]
    return currentPage ? currentPage.route : ''
  },

  /**
   * 检查是否可以返回上一页
   */
  canGoBack: () => {
    const pages = Taro.getCurrentPages()
    return pages.length > 1
  }
}

/**
 * 业务相关的快捷跳转方法
 */
export const BusinessRouter = {
  /**
   * 跳转到登录页
   */
  toLogin: () => {
    Router.reLaunch(ROUTES.LOGIN)
  },

  /**
   * 跳转到主页
   */
  toHome: () => {
    Router.reLaunch(ROUTES.HOME)
  },

  /**
   * 跳转到简历列表
   */
  toResumeList: () => {
    Router.navigateTo(ROUTES.RESUME_LIST)
  },

  /**
   * 跳转到创建简历页面
   */
  toCreateResume: () => {
    Router.navigateTo(ROUTES.RESUME_CREATE)
  },

  /**
   * 跳转到编辑简历页面
   * @param {string} resumeId 简历ID
   */
  toEditResume: (resumeId) => {
    Router.navigateTo(ROUTES.RESUME_EDIT, { id: resumeId })
  },

  /**
   * 跳转到简历预览页面
   * @param {string} resumeId 简历ID
   */
  toPreviewResume: (resumeId) => {
    Router.navigateTo(ROUTES.RESUME_PREVIEW, { id: resumeId })
  },

  /**
   * 跳转到用户资料页面
   */
  toUserProfile: () => {
    Router.navigateTo(ROUTES.USER_PROFILE)
  },

  /**
   * 跳转到设置页面
   */
  toUserSetting: () => {
    Router.navigateTo(ROUTES.USER_SETTING)
  },

  /**
   * 带权限检查的跳转
   * @param {string} url 目标页面
   * @param {boolean} needLogin 是否需要登录
   */
  navigateWithAuth: (url, needLogin = true) => {
    if (needLogin) {
      const token = Taro.getStorageSync('token')
      if (!token) {
        Taro.showToast({
          title: '请先登录',
          icon: 'none'
        })
        setTimeout(() => {
          BusinessRouter.toLogin()
        }, 1500)
        return
      }
    }
    Router.navigateTo(url)
  }
}

export default {
  ROUTES,
  Router,
  BusinessRouter
} 