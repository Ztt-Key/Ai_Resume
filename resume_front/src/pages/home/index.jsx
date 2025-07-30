import { View, Text, Button, Image } from '@tarojs/components'
import { useLoad, showToast, getStorageSync, removeStorageSync, reLaunch, navigateTo } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { authUtils } from '../../utils'
import {ROUTES,Router,} from '../../utils/router'
import './index.scss'

export default function Home() {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    // 获取用户信息
    const storedUserInfo = getStorageSync('userInfo')
    if (storedUserInfo) {
      setUserInfo(storedUserInfo)
    }
  }, [])

  // 退出登录处理
  const handleLogout = () => {
    try {
      // 清除存储的用户信息
      removeStorageSync('userInfo')
      removeStorageSync('token')
      
      showToast({
        title: '已退出登录',
        icon: 'success',
        duration: 1500
      })

      // 延迟跳转到登录页
      setTimeout(() => {
        reLaunch({ url: '/pages/index/index' })
      }, 1500)
    } catch (error) {
      showToast({
        title: '退出失败，请重试',
        icon: 'none'
      })
    }
  }
  // 跳转创建简历页面
  const goToCreateResume = () => {
    const url = ROUTES.CREATE_RESUME;
    console.log('Navigating to:', url);
    navigateTo({
      url,
      success: function(res) {
        console.log('跳转成功', res);
      },
      fail: function(err) {
        console.error('跳转失败', err);
        showToast({
          title: '页面跳转失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
  return (
    <View className='home-container'>
      <View className='home-header'>
        <Text className='welcome-text'>欢迎使用 AI简历助手</Text>
        <View className='user-info'>
          {userInfo.avatar && (
            <Image 
              className='user-avatar'
              src={userInfo.avatar}
              mode='aspectFill'
            />
          )}
          <Text className='user-name'>{userInfo.nickname || userInfo.phone || '用户'}</Text>
        </View>
      </View>

      <View className='feature-section'>
        <Text className='section-title'>功能菜单</Text>
        
        <View className='feature-grid'>
          <View 
            className='feature-item' 
            onClick={goToCreateResume}
            style={{ cursor: 'pointer' }}
          >
            <Text className='feature-icon'>📝</Text>
            <Text className='feature-title'>创建简历</Text>
            <Text className='feature-desc'>快速创建专业简历</Text>
          </View>
          
          <View className='feature-item'>
            <Text className='feature-icon'>🤖</Text>
            <Text className='feature-title'>AI优化</Text>
            <Text className='feature-desc'>智能优化简历内容</Text>
          </View>
          
          <View className='feature-item'>
            <Text className='feature-icon'>📊</Text>
            <Text className='feature-title'>简历分析</Text>
            <Text className='feature-desc'>专业简历评分</Text>
          </View>
          
          <View className='feature-item'>
            <Text className='feature-icon'>💼</Text>
            <Text className='feature-title'>职位匹配</Text>
            <Text className='feature-desc'>智能职位推荐</Text>
          </View>
        </View>
      </View>

      <View className='home-footer'>
        <Button 
          className='logout-btn'
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </View>
    </View>
  )
} 