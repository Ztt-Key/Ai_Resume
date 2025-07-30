export default defineAppConfig({
  // 页面路径 必须注册路由之后才可以使用跳转
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/createresume/index'
  ],
  permission: {
    'scope.userLocation': {
      desc: '您的位置信息将用于小程序位置接口的效果展示'
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'AI简历助手',
    navigationBarTextStyle: 'black'
  }
})
