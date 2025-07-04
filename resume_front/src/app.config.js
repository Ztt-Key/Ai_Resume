export default defineAppConfig({
  // 页面路径 必须注册路由之后才可以使用跳转
  pages: [
    'pages/index/index',
    'pages/home/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'AI简历助手',
    navigationBarTextStyle: 'black'
  }
})
