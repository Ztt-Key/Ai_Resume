import { View, Text, Input, Textarea, Button } from '@tarojs/components'
import { useState } from 'react'
import { showToast } from '@tarojs/taro'
import './index.scss'

function CreateResume() {
  const [resumeData, setResumeData] = useState({
    basicInfo: {
      name: '',
      phone: '',
      email: '',
      education: '',
      experience: ''
    },
    workExperience: [],
    projectExperience: [],
    skills: ''
  })

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: field ? {
        ...prev[section],
        [field]: value
      } : value
    }))
  }

  const handleSubmit = () => {
    // 基本验证
    if (!resumeData.basicInfo.name || !resumeData.basicInfo.phone) {
      showToast({
        title: '请填写必要的个人信息',
        icon: 'none'
      })
      return
    }

    // TODO: 保存简历数据
    console.log('简历数据:', resumeData)
    showToast({
      title: '保存成功',
      icon: 'success'
    })
  }

  return (
    <View className='create-resume-container'>
      <View className='resume-header'>
        <Text className='page-title'>创建简历</Text>
        <Text className='subtitle'>填写以下信息创建你的专业简历</Text>
      </View>

      <View className='resume-form'>
        {/* 基本信息 */}
        <View className='form-section'>
          <Text className='section-title'>基本信息</Text>
          <View className='input-group'>
            <Input
              className='input-field'
              placeholder='姓名'
              value={resumeData.basicInfo.name}
              onInput={e => handleInputChange('basicInfo', 'name', e.detail.value)}
            />
            <Input
              className='input-field'
              type='number'
              placeholder='手机号码'
              value={resumeData.basicInfo.phone}
              onInput={e => handleInputChange('basicInfo', 'phone', e.detail.value)}
            />
            <Input
              className='input-field'
              type='email'
              placeholder='电子邮箱'
              value={resumeData.basicInfo.email}
              onInput={e => handleInputChange('basicInfo', 'email', e.detail.value)}
            />
          </View>
        </View>

        {/* 教育背景 */}
        <View className='form-section'>
          <Text className='section-title'>教育背景</Text>
          <View className='input-group'>
            <Textarea
              className='textarea-field'
              placeholder='请输入您的教育经历'
              value={resumeData.basicInfo.education}
              onInput={e => handleInputChange('basicInfo', 'education', e.detail.value)}
            />
          </View>
        </View>

        {/* 技能特长 */}
        <View className='form-section'>
          <Text className='section-title'>技能特长</Text>
          <View className='input-group'>
            <Textarea
              className='textarea-field'
              placeholder='请输入您的技能特长'
              value={resumeData.skills}
              onInput={e => handleInputChange('skills', null, e.detail.value)}
            />
          </View>
        </View>

        {/* 工作经验 */}
        <View className='form-section'>
          <Text className='section-title'>工作经验</Text>
          <View className='input-group'>
            <Textarea
              className='textarea-field'
              placeholder='请输入您的工作经验'
              value={resumeData.basicInfo.experience}
              onInput={e => handleInputChange('basicInfo', 'experience', e.detail.value)}
            />
          </View>
        </View>

        <Button 
          className='submit-btn'
          onClick={handleSubmit}
        >
          生成简历
        </Button>
      </View>
    </View>
  )
}