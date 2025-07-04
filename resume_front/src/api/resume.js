import api from '../utils/api'

/**
 * 简历相关API
 */
export const resumeAPI = {
  /**
   * 获取简历列表
   * @param {object} params 查询参数
   */
  getResumeList: (params = {}) => {
    return api.get('/resume/list', params)
  },

  /**
   * 获取简历详情
   * @param {string} resumeId 简历ID
   */
  getResumeDetail: (resumeId) => {
    return api.get(`/resume/${resumeId}`)
  },

  /**
   * 创建简历
   * @param {object} resumeData 简历数据
   */
  createResume: (resumeData) => {
    return api.post('/resume/create', resumeData)
  },

  /**
   * 更新简历
   * @param {string} resumeId 简历ID
   * @param {object} resumeData 简历数据
   */
  updateResume: (resumeId, resumeData) => {
    return api.put(`/resume/${resumeId}`, resumeData)
  },

  /**
   * 删除简历
   * @param {string} resumeId 简历ID
   */
  deleteResume: (resumeId) => {
    return api.delete(`/resume/${resumeId}`)
  },

  /**
   * 复制简历
   * @param {string} resumeId 简历ID
   */
  copyResume: (resumeId) => {
    return api.post(`/resume/${resumeId}/copy`)
  },

  /**
   * AI优化简历
   * @param {string} resumeId 简历ID
   * @param {object} requirements 优化需求
   */
  optimizeResume: (resumeId, requirements) => {
    return api.post(`/resume/${resumeId}/optimize`, { requirements })
  },

  /**
   * 简历评分
   * @param {string} resumeId 简历ID
   */
  scoreResume: (resumeId) => {
    return api.post(`/resume/${resumeId}/score`)
  },

  /**
   * 导出简历
   * @param {string} resumeId 简历ID
   * @param {string} format 导出格式 (pdf, word, png)
   */
  exportResume: (resumeId, format = 'pdf') => {
    return api.get(`/resume/${resumeId}/export`, { format })
  },

  /**
   * 预览简历
   * @param {string} resumeId 简历ID
   */
  previewResume: (resumeId) => {
    return api.get(`/resume/${resumeId}/preview`)
  },

  /**
   * 获取简历模板列表
   */
  getTemplateList: () => {
    return api.get('/resume/templates')
  },

  /**
   * 应用简历模板
   * @param {string} resumeId 简历ID
   * @param {string} templateId 模板ID
   */
  applyTemplate: (resumeId, templateId) => {
    return api.post(`/resume/${resumeId}/apply-template`, { templateId })
  }
}

export default resumeAPI 