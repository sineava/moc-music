// 代理中间件
const { createProxyMiddleware } = require('http-proxy-middleware')

// * 也可以在package.json添加如下配置("proxy": "https://api.qq.jsososo.com/") => 但是没有pathRewrite等功能

module.exports = app => {
  app.use(
    '/qq',
    createProxyMiddleware({
      target: 'https://api.qq.jsososo.com/',
      // target: 'http://localhost:3300/',
      changeOrigin: true,
      pathRewrite: {
        '^/qq': '/',
      }
    })
  )
  app.use(
    '/download',
    createProxyMiddleware({
      target: 'http://122.226.161.16/',
      changeOrigin: true,
      pathRewrite: {
        '^/download': '/',
      }
    })
  )
}