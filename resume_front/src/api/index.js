/**
 * API模块统一入口
 * 导出所有业务API和基础API工具
 */

// 基础API工具
export { default as api } from '../utils/api'

// 业务API模块
export { userAPI } from './user'
export { resumeAPI } from './resume'

// 默认导出所有API
export default {
  userAPI: () => import('./user').then(m => m.userAPI),
  resumeAPI: () => import('./resume').then(m => m.resumeAPI)
} 