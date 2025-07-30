import { View, Text, Input, Button, Image } from '@tarojs/components'
import { useLoad, showToast, login, getUserProfile, setStorageSync, navigateTo } from '@tarojs/taro'
import { useState } from 'react'
import { userAPI } from '../../api/user'
import { validateUtils, authUtils } from '../../utils'
import './index.scss'
import Taro from '@tarojs/taro'
export default function Index() {
  const [loginType, setLoginType] = useState('phone') // 'phone' | 'wechat'
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useLoad(() => {
    console.log('登录页面加载完成')
  })

  // 发送验证码
  const sendVerifyCode = async () => {
    if (!phoneNumber) {
      showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }

    if (!validateUtils.validatePhone(phoneNumber)) {
      showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    if (countdown > 0) return

    try {
      setIsLoading(true)
      await userAPI.sendSmsCode(phoneNumber)
      
      showToast({
        title: '验证码已发送',
        icon: 'success'
      })

      // 开始倒计时
      let time = 60
      setCountdown(time)
      const timer = setInterval(() => {
        time--
        setCountdown(time)
        if (time === 0) {
          clearInterval(timer)
        }
      }, 1000)
    } catch (error) {
      showToast({
        title: error.message || '发送失败，请重试',
        icon: 'none'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 手机号验证码登录
  const handlePhoneLogin = async () => {
    if (!phoneNumber || !verifyCode) {
      showToast({
        title: '请输入手机号和验证码',
        icon: 'none'
      })
      return
    }

    if (!validateUtils.validatePhone(phoneNumber)) {
      showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }

    if (!validateUtils.validateVerifyCode(verifyCode)) {
      showToast({
        title: '请输入6位数字验证码',
        icon: 'none'
      })
      return
    }
    Taro.navigateTo({
  url: '/pages/home/index'
})
   //  最后在实现短信登录
    try {
      setIsLoading(true)
      const result = await userAPI.loginWithPhone(phoneNumber, verifyCode)
      
      showToast({
        title: '登录成功',
        icon: 'success'
      })
      
      // 存储登录信息
      setStorageSync('token', result.data.token)
      setStorageSync('userInfo', result.data.userInfo)
      
      // 跳转到主页或其他页面
      setTimeout(() => {
        navigateTo({ url: '/pages/home/index' })
      }, 1500)
    } catch (error) {
      showToast({
        title: error.message || '登录失败，请检查验证码',
        icon: 'none'
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 微信授权登录
  const handleWechatLogin = async () => {
    try {
      setIsLoading(true)
      
      // 获取微信登录code
      const loginRes = await login()
      console.log('微信登录code:', loginRes.code)
      
      // 获取用户信息授权
      const userProfile = await getUserProfile({
        desc: '用于完善用户资料'
      })
      
      console.log('用户信息:', userProfile.userInfo)
      
      // 发送到后端验证并获取token
      const result = await userAPI.loginWithWechat(loginRes.code, userProfile.userInfo)
      
      showToast({
        title: '微信登录成功',
        icon: 'success'
      })
      
      // 存储用户信息
      setStorageSync('token', result.data.token)
      setStorageSync('userInfo', {
        ...result.data.userInfo,
        avatar: userProfile.userInfo.avatarUrl,
        nickname: userProfile.userInfo.nickName
      })
      
      // 跳转到主页
      setTimeout(() => {
        navigateTo({ url: '/pages/home/index' })
      }, 1500)
    } catch (error) {
      console.error('微信登录失败:', error)
      
      // 处理不同类型的错误
      let errorMessage = '微信登录失败'
      if (error.message) {
        if (error.message.includes('getUserProfile')) {
          errorMessage = '需要授权获取用户信息'
        } else if (error.message.includes('login')) {
          errorMessage = '微信登录授权失败'
        } else {
          errorMessage = error.message
        }
      }
      
      showToast({
        title: errorMessage,
        icon: 'none'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className='login-container'>
      <View className='login-main'>
        <View className='login-header'>
          <Text className='login-title'>AI 简历助手</Text>
          <Text className='login-subtitle'>让简历更出色，让机会更多</Text>
        </View>

        <View className='login-tabs'>
          <View 
            className={`tab-item ${loginType === 'phone' ? 'active' : ''}`}
            onClick={() => setLoginType('phone')}
          >
            <Text>手机登录</Text>
          </View>
          <View 
            className={`tab-item ${loginType === 'wechat' ? 'active' : ''}`}
            onClick={() => setLoginType('wechat')}
          >
            <Text>微信登录</Text>
          </View>
        </View>

        <View className={`login-content ${isLoading ? 'loading' : ''}`}>
          {loginType === 'phone' ? (
            <View className='phone-login'>
              <View className='input-group'>
                <Input
                  className='input-field phone-input'
                  type='number'
                  placeholder='请输入手机号'
                  value={phoneNumber}
                  onInput={(e) => setPhoneNumber(e.detail.value)}
                  maxlength={11}
                  adjustPosition
                  placeholderClass='input-placeholder'
                />
              </View>
              
              <View className='input-group verify-group'>
                <Input
                  className='input-field verify-input'
                  type='number'
                  placeholder='请输入验证码'
                  value={verifyCode}
                  onInput={(e) => setVerifyCode(e.detail.value)}
                  maxlength={6}
                  adjustPosition
                  placeholderClass='input-placeholder'
                >
                </Input>
         
              </View>

              <Button 
                className='login-btn'
                onClick={handlePhoneLogin}
                loading={isLoading}
                disabled={isLoading}
              >
                登录
              </Button>
            </View>
          ) : (
            <View className='wechat-login'>
              <View className='wechat-icon'>
                <Image 
                  className='wechat-logo'
                  src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMwN0MxNjAiLz4KPHBhdGggZD0iTTI4LjUgMjVDMjIuNyAyNSAxOCAyOS43IDE4IDM1LjVDMTggNDEuMyAyMi43IDQ2IDI4LjUgNDZIMzEuNUwzNyA1MS41TDQyLjUgNDZINDUuNUM1MS4zIDQ2IDU2IDQxLjMgNTYgMzUuNUM1NiAyOS43IDUxLjMgMjUgNDUuNSAyNUgyOC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTM1IDMwQzM2LjEgMzAgMzcgMzAuOSAzNyAzMkMzNyAzMy4xIDM2LjEgMzQgMzUgMzRDMzMuOSAzNCAzMyAzMy4xIDMzIDMyQzMzIDMwLjkgMzMuOSAzMCAzNSAzMFoiIGZpbGw9IiMwN0MxNjAiLz4KPHBhdGggZD0iTTQzIDMwQzQ0LjEgMzAgNDUgMzAuOSA0NSAzMkM0NSAzMy4xIDQ0LjEgMzQgNDMgMzRDNDEuOSAzNCA0MSAzMy4xIDQxIDMyQzQxIDMwLjkgNDEuOSAzMCA0MyAzMFoiIGZpbGw9IiMwN0MxNjAiLz4KPC9zdmc+'
                  mode='aspectFit'
                />
              </View>
              
              <Text className='wechat-tip'>点击下方按钮使用微信授权登录</Text>
              
              <Button 
                className='wechat-login-btn'
                onClick={handleWechatLogin}
                loading={isLoading}
                disabled={isLoading}
              >
                <Image 
                  className='wechat-small-icon'
                  src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMTAiIGZpbGw9IiNmZmZmZmYiLz4KPHBhdGggZD0iTTcuMTMgNi4yNUM1LjY3IDYuMjUgNC41IDcuNDIgNC41IDguODhDNC41IDEwLjMzIDUuNjcgMTEuNSA3LjEzIDExLjVIOC4xM0wxMC4yNSAxMy42M0wxMi4zOCAxMS41SDEzLjM4QzE0LjgzIDExLjUgMTYgMTAuMzMgMTYgOC44OEMxNiA3LjQyIDE0LjgzIDYuMjUgMTMuMzggNi4yNUg3LjEzWiIgZmlsbD0iIzA3QzE2MCIvPgo8L3N2Zz4='
                  mode='aspectFit'
                />
                微信授权登录
              </Button>
            </View>
          )}
        </View>

        <View className='login-footer'>
          <Text className='agreement-text'>
            登录即表示同意
            <Text className='link-text'>《用户协议》</Text>
            和
            <Text className='link-text'>《隐私政策》</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}
