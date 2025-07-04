import api from '../utils/api'

/**
 * 用户相关API
 */
export const userAPI = {
  /**
   * 发送短信验证码
   * @param {string} phoneNumber 手机号
   */
  sendSmsCode: (phoneNumber) => {
    return api.post('/user/send-sms', { phone: phoneNumber })
  },

  /**
   * 手机号验证码登录
   * @param {string} phoneNumber 手机号
   * @param {string} verifyCode 验证码
   */
  loginWithPhone: (phoneNumber, verifyCode) => {
    return api.post('/user/login/phone', {
      phone: phoneNumber,
      code: verifyCode
    })
  },

  /**
   * 微信登录
   * @param {string} code 微信登录code
   * @param {object} userInfo 用户信息
   */
  loginWithWechat: (code, userInfo) => {
    return api.post('/user/login/wechat', {
      code,
      userInfo: {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender,
        country: userInfo.country,
        province: userInfo.province,
        city: userInfo.city,
        language: userInfo.language
      }
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: () => {
    return api.get('/user/info')
  },

  /**
   * 更新用户信息
   * @param {object} userInfo 用户信息
   */
  updateUserInfo: (userInfo) => {
    return api.put('/user/info', userInfo)
  },

  /**
   * 退出登录
   */
  logout: () => {
    return api.post('/user/logout')
  },

  /**
   * 刷新token
   */
  refreshToken: () => {
    return api.post('/user/refresh-token')
  },

  /**
   * 修改密码
   * @param {string} oldPassword 旧密码
   * @param {string} newPassword 新密码
   */
  changePassword: (oldPassword, newPassword) => {
    return api.post('/user/change-password', {
      oldPassword,
      newPassword
    })
  },

  /**
   * 绑定手机号
   * @param {string} phoneNumber 手机号
   * @param {string} verifyCode 验证码
   */
  bindPhone: (phoneNumber, verifyCode) => {
    return api.post('/user/bind-phone', {
      phone: phoneNumber,
      code: verifyCode
    })
  },

  /**
   * 解绑手机号
   * @param {string} verifyCode 验证码
   */
  unbindPhone: (verifyCode) => {
    return api.post('/user/unbind-phone', {
      code: verifyCode
    })
  }
}

export default userAPI 