const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
module.exports = {
  webpack: {
    alias: {
      '@@': pathResolve('.'),
      '@': pathResolve('src'),
      '@api': pathResolve('src/api'),
      '@utils': pathResolve('src/utils'),
      '@components': pathResolve('src/components'),
      '@pages': pathResolve('src/pages')
    }
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'antd-mobile', style: 'css' }],
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  },
    devServer: { // 服务器配置
        port: 9527,
        open: true,
        proxy:{
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            pathRewrite: {
              '^/api': '/api'
            }
          }
        }
      },
}